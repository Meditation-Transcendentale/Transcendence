import numpy as np
import random
import asyncio
import json
import time
from constants import *
from heuristics import *

class GameStateNode:
    def __init__(self, ball_pos, ball_vel, ai_paddle_pos, player_paddle_pos, next_ball_pos):
        self.ball_pos = ball_pos
        self.ball_vel = ball_vel
        self.ai_paddle_pos = ai_paddle_pos
        self.player_paddle_pos = player_paddle_pos
        self.next_ball_pos = next_ball_pos
        self.children = []
        self.parent = None
        self.alpha = 0
        self.beta = 0

def predict_ball_position(ball_pos, ball_vel):
    """
    Predicts the Y-position of the ball when it reaches the AI or opponent paddle.

    Parameters:
    - ball_pos: (x_b, y_b) current position of the ball.
    - ball_vel: (v_bx, v_by) velocity of the ball.

    Returns:
    - final_y: The Y-coordinate of the ball when it reaches the paddle.
    """
    x_b, y_b = ball_pos
    v_bx, v_by = ball_vel
    map_max = (MAP_HEIGHT - BALL_DIAM - WALL_SIZE) * 0.5

    if v_bx < 0:
        time_to_paddle = (abs(PADDLE_PLAYER_X - x_b) - (PADDLE_WIDTH + BALL_DIAM) * 0.5 ) / abs(v_bx)
        next_receiver_x = PADDLE_PLAYER_X + (PADDLE_WIDTH + BALL_DIAM) * 0.5 
    else:
        time_to_paddle = (abs(PADDLE_AI_X - x_b) - (PADDLE_WIDTH + BALL_DIAM) * 0.5 ) / abs(v_bx)
        next_receiver_x = PADDLE_AI_X - (PADDLE_WIDTH + BALL_DIAM) * 0.5
    
    predicted_y = y_b + v_by * time_to_paddle

    y_from_bottom = predicted_y - map_max
    
    bounces = int(y_from_bottom // (MAP_HEIGHT - BALL_DIAM - WALL_SIZE))
    
    remainder = y_from_bottom % (MAP_HEIGHT - BALL_DIAM - WALL_SIZE)
    
    if (bounces % 2 == 1):
        final_y = -map_max + remainder
    else:
        final_y = map_max - remainder
        v_by *= -1

    return (next_receiver_x, round(final_y, 2)), (v_bx, v_by)

def generate_paddle_range(predicted_pos):
    """
    Generate a range of Y positions around the position where the ball should cross the goal
    """
    lower_bound = max(-(MAP_HEIGHT + PADDLE_HEIGHT + WALL_SIZE) * 0.5, predicted_pos - PADDLE_HEIGHT * 0.5)
    upper_bound = min((MAP_HEIGHT - PADDLE_HEIGHT - WALL_SIZE) * 0.5, predicted_pos + PADDLE_HEIGHT * 0.5)
    return lower_bound, upper_bound

def expand(node):
    """
    Expands the current node by simulating ball travel until it reaches AI or Opponent.
    Each child represents a possible final position where the ball is received.
    """
    
    range_pos = generate_paddle_range(node.next_ball_pos[1])
    new_children_pos = np.arange(range_pos[0], range_pos[1] + 0.1, 0.1)
    for paddle_pos in new_children_pos:
        distance_to_ball = abs(paddle_pos - node.next_ball_pos[1])
        new_vel_y = node.ball_vel[1] * (-BALL_ACCELERATION if (np.sign(paddle_pos - node.next_ball_pos[1]) == np.sign(node.ball_vel[1])) else BALL_ACCELERATION) * distance_to_ball
        future_ball_pos, new_vel  = predict_ball_position(node.next_ball_pos, (node.ball_vel[0] * -BALL_ACCELERATION, new_vel_y))
        if (node.ball_vel[0] < 0):
            new_node = GameStateNode(node.next_ball_pos, new_vel, paddle_pos, node.player_paddle_pos, future_ball_pos)
            new_node.alpha, new_node.beta = evaluate_node(new_node)
        else:
            new_node = GameStateNode(node.next_ball_pos, new_vel, node.ai_paddle_pos, paddle_pos, future_ball_pos)
            new_node.alpha, new_node.beta = evaluate_node(new_node)
        node.children.append(new_node)
        new_node.parent = node

def update_parent(selected_node):
    selected_node.alpha = -max(child.beta for child in selected_node.children)
    selected_node.beta = -max(child.alpha for child in selected_node.children)
    if selected_node.parent:
        update_parent(selected_node.parent)

def evaluate_node(node):
    """
    Evaluates a node where the ball is received.
    """
    my_paddle_pos = node.player_paddle_pos if node.ball_vel[0] > 0 else node.ai_paddle_pos
    opponent_paddle_pos = node.player_paddle_pos if node.ball_vel[0] < 0 else node.ai_paddle_pos
    
    weights = {
        'tti': 0.2,
        'var': 0.3,
        'disrupt': 0.25,
        'center_bias': 0.15,
        'entropy': 0.25,
        'consistency': 0.1
    }
    
    tti_opt, tti_pess = heuristic_time_to_intercept(node, my_paddle_pos)
    var_opt, var_pess = heuristic_return_angle_variability(node)
    disrupt_opt, disrupt_pess = heuristic_opponent_disruption(node, opponent_paddle_pos)
    center_opt, center_pess = heuristic_center_bias_correction(node)
    entropy_opt, entropy_pess = heuristic_entropy_reaction(node, opponent_paddle_pos)
    consistency_opt, consistency_pess = heuristic_consistency(node)

    h_opt = (
        weights['tti'] * tti_opt +
        weights['var'] * var_opt +
        weights['disrupt'] * disrupt_opt +
        weights ['center_bias'] * center_opt +
        weights['entropy'] * entropy_opt +
        weights['consistency'] * consistency_opt
    )

    h_pess = (  
        weights['tti'] * tti_pess +
        weights['var'] * var_pess +
        weights['disrupt'] * disrupt_pess +
        weights ['center_bias'] * center_pess +
        weights['entropy'] * entropy_pess +
        weights['consistency'] * consistency_pess
    )

    # h_pess = min(h_pess, h_opt)

    return h_opt, h_pess

def extract_movement_sequence(best_node, current_ai_pos):
    """
    Converts the final position decision into a movement sequence.
    """
    movement_sequence = []
    
    while abs(best_node.ai_paddle_pos - current_ai_pos) > STEP_SIZE * 0.5:
        if best_node.ai_paddle_pos < current_ai_pos:
            movement_sequence.append("UP")
            current_ai_pos += STEP_SIZE
        elif best_node.ai_paddle_pos > current_ai_pos:
            movement_sequence.append("DOWN")
            current_ai_pos -= STEP_SIZE

    return movement_sequence

    
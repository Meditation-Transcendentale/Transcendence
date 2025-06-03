import math
from constants import *

# Add a tracking of the center_bias of each player to predict there movements
# (tendancies to go back to the middle after a move)

# Need to get the correct ratio of possible movements by frame, can be the same
# as the ball one (60fps), if it's different adapt to get a proportional one
# to the ball speed


def heuristic_time_to_intercept(node, opponent_paddle_pos):
    """
    The less the opponent has to move to intercept the ball in their turn, the better it is for them.
    More movement = better.
    """
    y_target = node.next_ball_pos[1]
    distance_to_target = abs(y_target - opponent_paddle_pos)

    frames_needed = distance_to_target / MAX_PADDLE_SPEED
    max_frames = MAP_HEIGHT / MAX_PADDLE_SPEED

    score = frames_needed / max_frames
    return score, score


def heuristic_return_angle_variability(node):
    """
    Estimate how many distinct return angles the opponent can reach
    before the ball hits them.
    Lower variability = better.
    """
    try:
        x_distance = abs(node.next_ball_pos[0] - node.ball_pos[0])
        time_to_impact = x_distance / abs(node.ball_vel[0])
    except ZeroDivisionError:
        time_to_impact = float('inf')

    frames_to_impact = time_to_impact * FPS
    max_reach = min(MAX_PADDLE_SPEED * frames_to_impact + PADDLE_HALF_HEIGHT, 7.5)

    distance = abs(node.next_ball_pos[1] - node.player_paddle_pos)
    actual_reach = min(distance, max_reach)

    angle_resolution = STEP_SIZE
    max_possible_returns = max_reach / angle_resolution
    num_returns = actual_reach / angle_resolution

    variability_score = min(num_returns / max_possible_returns, 1.0)

    return 1 - variability_score, variability_score


def heuristic_opponent_disruption(node, opponent_paddle_pos):
    """
    Estimate how hard it will be for the opponent to reach the next ball position.
    High score = far from it (more disruptive for them).
    """
    try:
        x_distance = abs(node.next_ball_pos[0] - node.ball_pos[0])
        time_to_impact = x_distance / abs(node.ball_vel[0])
    except ZeroDivisionError:
        time_to_impact = float('inf')

    frames_to_impact = time_to_impact * FPS

    raw_reach = MAX_PADDLE_SPEED * frames_to_impact + PADDLE_HALF_HEIGHT
    difficulty_modifier = 0.75
    max_reach = min(raw_reach, 7.5)

    target_y = node.next_ball_pos[1]
    distance = abs(target_y - opponent_paddle_pos)

    disruption_score = min(distance / max_reach, 1.0)
    return disruption_score, 0.0
 

def heuristic_center_bias_correction(node):
    """
    Smooths angles values more 
    """
    vx, vy = node.ball_vel
    angle = abs(math.atan2(vy, vx))

    ideal_angle = math.radians(30)
    max_angle = math.radians(75)

    deviation = abs(angle - ideal_angle)
    score = 1 - (deviation / max_angle)

    score = max(0.0, min(score, 1.0))

    return score, score

    
def heuristic_entropy_reaction(node, opponent_paddle_pos):
    """
    How wide is the decision cone of the opponent, the lower the better.
    Based on how centered they are when reaching the ball.
    """
    try:
        time_to_impact = abs(node.next_ball_pos[0] - node.ball_pos[0]) / abs(node.ball_vel[0])
    except ZeroDivisionError:
        time_to_impact = float('inf')

    frames = time_to_impact * FPS
    max_displacement = min(MAX_PADDLE_SPEED * frames, 7.5)

    target_y = node.next_ball_pos[1]
    current_y = opponent_paddle_pos

    distance_needed = abs(target_y - current_y)
    distance_travelled = min(distance_needed, max_displacement)
    direction = 1 if target_y > current_y else -1
    predicted_y = current_y + direction * distance_travelled

    offset = abs(predicted_y - target_y)
    entropy_ratio = max(0.0, (PADDLE_HALF_HEIGHT - offset) / PADDLE_HALF_HEIGHT)
    entropy_score = entropy_ratio ** 2

    return 1 - entropy_score, entropy_score

    

def heuristic_consistency(node):
    """
    Is the state recoverable or is it pure gambling
    """
    vx, vy = node.ball_vel

    angle = abs(math.atan2(vy, vx))
    max_angle = math.radians(85)

    consistency_score = 1 - (angle / max_angle)
    score = max(0.0, min(consistency_score, 1.0))

    return score, score

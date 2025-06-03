from constants import *

def predict_ball_trajectory(ball_pos, ball_v):
    """Simulate the path and collisions to get the Y where the ball should cross the goal 
    """
    current_pos = list(ball_pos)
    ball_v = list(ball_v)
    while (current_pos[0] + BALL_DIAM) <= PADDLE_AI_X and (current_pos[0] - BALL_DIAM) >= PADDLE_PLAYER_X:
        if (current_pos[1] - BALL_DIAM) < -(MAP_HEIGHT / 2) or (current_pos[1] + BALL_DIAM) > MAP_HEIGHT / 2:
            ball_v[1] = -ball_v[1]
        current_pos[1] += ball_v[1]
        current_pos[0] += ball_v[0]
    if (current_pos[0] > 0):
        current_pos[0] = min(PADDLE_AI_X - BALL_DIAM, current_pos[0])
    else:
        current_pos[0] = max(PADDLE_PLAYER_X + BALL_DIAM, current_pos[0])
    current_pos[1] = round(current_pos[1], 2)
    return current_pos

def collision_with_paddle(parent, child_paddle_y):
    """Use the parent predicted collision position
    return the velocity of the ball after the collision with the paddle
    """
    distance_center_paddle = child_paddle_y - PADDLE_HEIGHT + parent.future_ball_pos[1] if (abs(child_paddle_y - PADDLE_HEIGHT + parent.future_ball_pos[1])) else child_paddle_y + PADDLE_HEIGHT - parent.future_ball_pos[1]
    ball_v = [round(parent.ball_v[0] * -BALL_ACCELERATION, 2), round(parent.ball_v[1] * BALL_ACCELERATION * 0.16 * 1.05 * distance_center_paddle, 2)]
    return ball_v
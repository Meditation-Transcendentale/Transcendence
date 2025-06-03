import math
from dataclasses import dataclass
from heuristics import *
import pandas as pd
import ace_tools_open as tools


# Simulating the GameStateNode class
@dataclass
class GameStateNode:
    ball_pos: tuple
    ball_vel: tuple
    ai_paddle_pos: float
    player_paddle_pos: float
    next_ball_pos: tuple


# Create various node cases for each type of test
edge_case_nodes = [
    GameStateNode(ball_pos=(0, 4.5), ball_vel=(0.2, -0.49), ai_paddle_pos=0, player_paddle_pos=-3.75, next_ball_pos=(9.125, -4.5)),
    GameStateNode(ball_pos=(0, -4.5), ball_vel=(0.2, 0.49), ai_paddle_pos=0, player_paddle_pos=3.75, next_ball_pos=(9.125, 4.5)),
    GameStateNode(ball_pos=(0, 0), ball_vel=(0.01, 0), ai_paddle_pos=0, player_paddle_pos=0, next_ball_pos=(9.125, 0)),
]

# Run and log all heuristics for each edge case
results = []
for i, node in enumerate(edge_case_nodes):
    tti = heuristic_time_to_intercept(node, node.player_paddle_pos)
    disrupt = heuristic_opponent_disruption(node, node.player_paddle_pos)
    entropy = heuristic_entropy_reaction(node)
    var = heuristic_return_angle_variability(node)
    results.append({
        "case": f"Edge Case {i+1}",
        "tti": tti,
        "disruption": disrupt,
        "entropy": entropy,
        "variability": var
    })

tools.display_dataframe_to_user(name="Edge Case Heuristic Analysis", dataframe=pd.DataFrame(results))
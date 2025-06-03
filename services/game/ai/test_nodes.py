from main import predict_ball_position, GameStateNode, expand, update_parent
from bstar import *
from heuristics import *
from constants import *
import numpy as np

def test_predict_ball_position():
    print("Testing predict_ball_position()...")

    result, ball_vel = predict_ball_position((0, 0), (0.1, 0.2))
    print(f"Expected: (9.125, -0.75), Got: {result}")
    print("v_y doesn't change sign")
    assert result == (9.125, -0.75) and np.sign(ball_vel[1]) == np.sign(0.2)

    result, ball_vel = predict_ball_position((0, 0), (0.1, -0.2))
    print(f"Expected: (9.125, 0.75), Got: {result}")
    print("v_y doesn't change sign")
    assert result == (9.125, 0.75) and np.sign(ball_vel[1]) == np.sign(-0.2)

    result, ball_vel = predict_ball_position((0, 0), (-0.1, 0.2))
    print(f"Expected: (-9.125, -0.75), Got: {result}")
    print("v_y doesn't change sign")
    assert result == (-9.125, -0.75) and np.sign(ball_vel[1]) == np.sign(0.2)

    result, ball_vel = predict_ball_position((0, 0), (-0.1, -0.2))
    print(f"Expected:(-9.125, 0.75), Got: {result}")
    print("v_y doesn't change sign")
    assert result == (-9.125, 0.75) and np.sign(ball_vel[1]) == np.sign(-0.2)

    result, ball_vel = predict_ball_position((3.5, 1.2), (0.24, 0.17))
    print (f"Expected: (9.125, 4.32), Got {result}")
    print("v_y changes sign")
    assert result == (9.125, 4.32) and np.sign(ball_vel[1]) != np.sign(0.17)
    
    result, ball_vel = predict_ball_position((-3.5, 1.2), (-0.24, 0.17))
    print (f"Expected: (-9.125, 4.32), Got {result}")
    print("v_y changes sign")
    assert result == (-9.125, 4.32) and np.sign(ball_vel[1]) != np.sign(0.17)
    
    result, ball_vel = predict_ball_position((-4, 1.2), (0.12, 0.23))
    print (f"Expected: (9.125, 2.14), Got {result}")
    print("v_y changes sign")
    assert result == (9.125, 2.14) and np.sign(ball_vel[1]) != np.sign(0.23)

    result, ball_vel = predict_ball_position((4, 1.2), (-0.12, 0.23))
    print (f"Expected: (-9.125, 2.14), Got {result}")
    print("v_y changes sign")
    assert result == (-9.125, 2.14) and np.sign(ball_vel[1]) != np.sign(0.23)
    
    result, ball_vel = predict_ball_position((-1.93, -1.36), (-0.09, 0.42))
    print (f"Expected: (-9.125, -3.72), Got {result}")
    print("v_y changes sign")
    assert result == (-9.125, -3.72) and np.sign(ball_vel[1]) != np.sign(0.42)
    
    result, ball_vel = predict_ball_position((2.57, -3.95), (0.47, -0.28))
    print (f"Expected: (9.125, -1.64), Got {result}")
    print("v_y changes sign")
    assert result == (9.125, -1.64) and np.sign(ball_vel[1]) != np.sign(-0.28)
    
    print("✅ predict_ball_position() passed all tests!\n")

def test_expand():
    print("Testing expand()...")
    entry_ball_pos = (0, 0)
    entry_ball_vel = (0.1, 0.2)
    entry_ai_pos = 0
    entry_opp_pos = 0
    entry_next_ball_pos, not_used_vel = predict_ball_position(entry_ball_pos, entry_ball_vel)


    root = GameStateNode(entry_ball_pos, entry_ball_vel, entry_ai_pos, entry_opp_pos, entry_next_ball_pos)
    expand(root)
    
    for child in root.children:
        print("---------- CHILD ----------")
        # print ("ball_pos:", child.ball_pos)
        # print ("ball_vel:", child.ball_vel)
        # print ("ai_paddle_pos:", child.ai_paddle_pos)
        # print ("player_paddle_pos:", child.player_paddle_pos)
        # print ("next_ball_pos:", child.next_ball_pos)
        print ("optimistic value:", child.alpha)
        print ("pessimistic value:", child.beta)
        expand(child)
        print ("---------- END ----------")
        for child2 in child.children:
            print("---------- GRAND CHILD ----------")
            # print ("ball_pos:", child2.ball_pos)
            # print ("ball_vel:", child2.ball_vel)
            # print ("ai_paddle_pos:", child2.ai_paddle_pos)
            # print ("player_paddle_pos:", child2.player_paddle_pos)
            # print ("next_ball_pos:", child2.next_ball_pos)
            print ("optimistic value:", child2.alpha)
            print ("pessimistic value:", child2.beta)
            print ("---------- END ----------")
        print("---------- POST EXPANSION UPDATING ----------")
        # print ("ball_pos:", child.ball_pos)
        # print ("ball_vel:", child.ball_vel)
        # print ("ai_paddle_pos:", child.ai_paddle_pos)
        # print ("player_paddle_pos:", child.player_paddle_pos)
        # print ("next_ball_pos:", child.next_ball_pos)
        print ("optimistic value:", child.alpha)
        print ("pessimistic value:", child.beta)
    print("---------- ROOT ENDING VALUES ----------")
    # print ("ball_pos:", root.ball_pos)
    # print ("ball_vel:", root.ball_vel)
    # print ("ai_paddle_pos:", root.ai_paddle_pos)
    # print ("player_paddle_pos:", root.player_paddle_pos)
    # print ("next_ball_pos:", root.next_ball_pos)
    print ("optimistic value:", root.alpha)
    print ("pessimistic value:", root.beta)
    print("✅ expand() passed all tests!\n")

def test_heuristics():
    print("Testing heuristics with manual test cases...\n")

    # Quick node factory with override support
    def make_node(**kwargs):
        return GameStateNode(
            ball_pos=kwargs.get('ball_pos', (0.0, 0.0)),
            ball_vel=kwargs.get('ball_vel', (0.2, 0.1)),
            ai_paddle_pos=kwargs.get('ai_paddle_pos', 0.0),
            player_paddle_pos=kwargs.get('player_paddle_pos', 0.0),
            next_ball_pos=kwargs.get('next_ball_pos', (9.125, 0.0)),
        )


    print("🔹 heuristic_time_to_intercept")
    # Paddle and ball both at 0 — easy intercept for opponent
    node = make_node(next_ball_pos=(9.125, 0.0))
    opt, _ = heuristic_time_to_intercept(node, opponent_paddle_pos=0.0)
    print(f"Expected low score (easy to intercept), Got: {opt}")
    assert opt < 0.05

    # Ball at bottom, opponent at top — tough intercept
    node = make_node(next_ball_pos=(9.125, -4.5))
    opt, _ = heuristic_time_to_intercept(node, opponent_paddle_pos=3.75)
    print(f"Expected high score (hard to intercept), Got: {opt}")
    assert opt > 0.8


    # === Opponent Disruption Test ===

    print("\n🔹 heuristic_opponent_disruption")
    node = make_node(player_paddle_pos=3.75, next_ball_pos=(9.125, 4.0))
    opt, _ = heuristic_opponent_disruption(node, opponent_paddle_pos=node.player_paddle_pos)
    print(f"Expected low disruption, Got: {opt}")
    assert opt < 0.2
    
    node = make_node(player_paddle_pos=-3.75, next_ball_pos=(9.125, 4.0))
    opt, _ = heuristic_opponent_disruption(node, opponent_paddle_pos=node.player_paddle_pos)
    print(f"Expected high disruption, Got: {opt}")
    assert opt > 0.7


    # === Entropy Test ===
    print("\n🔹 heuristic_entropy_reaction")
    node = make_node(player_paddle_pos=3.75, next_ball_pos=(9.125, -4.5))
    _, pess = heuristic_entropy_reaction(node, opponent_paddle_pos=node.player_paddle_pos)
    print(f"Expected low entropy (centered), Got: {pess}")
    assert pess < 0.3
    
    node = make_node(player_paddle_pos=0.0, next_ball_pos=(9.125, 0.0))
    _, pess = heuristic_entropy_reaction(node, opponent_paddle_pos=node.player_paddle_pos)
    print(f"Expected high entropy (bad positioning), Got: {pess}")
    assert pess > 0.7
    

    # === Return Angle Variability Test ===
    print("\n🔹 heuristic_return_angle_variability")
    node = make_node(player_paddle_pos=0.0, next_ball_pos=(9.125, 4.5))
    _, pess = heuristic_return_angle_variability(node)
    print(f"Expected high variability, Got: {pess}")
    assert pess >= 0.6

    node = make_node(player_paddle_pos=3.75, next_ball_pos=(9.125, 4.5))
    _, pess = heuristic_return_angle_variability(node)
    print(f"Expected low variability, Got: {pess}")
    assert pess < 0.2

    # === Center Bias Test ===
    print("\n🔹 heuristic_center_bias_correction")
    node = make_node(ball_vel=(0.2, 0))
    opt, _ = heuristic_center_bias_correction(node)
    print(f"Expected lower score (flat shot), Got: {opt}")
    assert opt < 0.61
    
    node = make_node(ball_vel=(0.2, 0.12))  # ~30 degrees
    opt, _ = heuristic_center_bias_correction(node)
    print(f"Expected near 1.0 (ideal angle), Got: {opt}")
    assert opt > 0.9


    # === Consistency Test ===
    print("\n🔹 heuristic_consistency")
    node = make_node(ball_vel=(0.2, 0.01))  # near-horizontal
    opt, _ = heuristic_consistency(node)
    print(f"Expected high consistency, Got: {opt}")
    assert opt > 0.9

    node = make_node(ball_vel=(0.05, 0.6))  # near vertical
    opt, _ = heuristic_consistency(node)
    print(f"Expected low consistency, Got: {opt}")
    assert opt < 0.2

    print("\n✅ All heuristic tests passed!\n")
    
    
test_heuristics()
test_predict_ball_position()
test_expand()
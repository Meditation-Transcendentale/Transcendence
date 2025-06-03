from bstar import *

def test_tl_select_relevant_nodes():
    class GameStateNode:
        def __init__(self, alpha, beta):
            self.alpha = alpha
            self.beta = beta
            self.children = []

    def build_root_with_children(children_values):
        root = GameStateNode(alpha=0, beta=0)
        root.children = [GameStateNode(alpha, beta) for alpha, beta in children_values]
        return root

    # Test 1: Basic selection
    root = build_root_with_children([(5, 1), (3, 2), (4, 3)])
    relevant = tl_select_relevant_nodes(root)
    # Best pessimistic (beta) value is 3
    # print(f"Expected:{root.children[0]}, Got:{relevant[0]}")
    assert relevant[0] == root.children[0]
    # print(f"Expected:{root.children[2]}, Got:{relevant[1]}")
    assert relevant[1] == root.children[2]
    # print(f"Length Expected: 2, Got:{len(relevant)}")
    assert len(relevant) == 2
    print("Test 1 passed (2 nodes are relevant)")

    # Test 2: No relevant nodes (all alpha <= best beta)
    root = build_root_with_children([(2, 3), (3, 4), (1, 2)])
    relevant = tl_select_relevant_nodes(root)
    assert relevant == [], "Test 2 failed: Should return empty list when no node is relevant"
    print("Test 2 passed (no node is relevant)")

    # Test 3: All nodes relevant
    root = build_root_with_children([(5, 1), (6, 1), (7, 1)])
    relevant = tl_select_relevant_nodes(root)
    print(f"Expected: {root.children[2]}, Got: {relevant[0]}")
    assert relevant[2] == root.children[0]
    print(f"Expected: {root.children[1]}, Got: {relevant[1]}")
    assert relevant[1] == root.children[1]
    print(f"Expected: {root.children[0]}, Got: {relevant[2]}")
    assert relevant[0] == root.children[2]
    print(f"Expected: {len(root.children)}, Got: {len(relevant)}")
    assert len(relevant) == len(root.children), "Test 3 failed: All nodes should be relevant"
    print("Test 3 passed (all nodes are relevants)")

    # Test 4: Tie case — alpha == best beta
    root = build_root_with_children([(3, 1), (2, 2), (2, 3)])
    relevant = tl_select_relevant_nodes(root)
    assert relevant == [], "Test 4 failed: Should not include node with alpha == best beta"
    print("Test 4 passed (node alpha == beta)")

    # Test 5: Single child node
    root = build_root_with_children([(4, 2)])
    relevant = tl_select_relevant_nodes(root)
    assert relevant == [root.children[0]], "Test 5 failed: Single node should be relevant if alpha > beta"
    print("Test 5 passed (single child node)")

    # Test 6: Empty children list (edge case)
    root = build_root_with_children([])
    relevant = tl_select_relevant_nodes(root)
    assert relevant == [], "Test 6 failed: Empty children list should return empty relevant list"
    print("Test 6 passed (no children)")
    print("All tests passed for tl_select_relevant_nodes!")



def test_tl_two_relevant_nodes():
    class GameStateNode:
        def __init__(self, name, alpha, beta):
            self.name = name
            self.alpha = alpha
            self.beta = beta

        def __repr__(self):
            return f"{self.name}(alpha={self.alpha}, beta={self.beta})"

    PROVEBEST = "PROVEBEST"
    DISPROVEBEST = "DISPROVEBEST"
    
    # Test 1: Case 1 from the doc — α1 == α2, β1 > β2 → DISPROVEBEST
    n1 = GameStateNode("N1", alpha=5, beta=4)
    n2 = GameStateNode("N2", alpha=5, beta=3)
    strategy, node = tl_two_relevant_nodes([n1, n2])
    print(f"Expected: DISPROVEBEST, Got: {strategy}")
    assert strategy == DISPROVEBEST, "Test 1 failed: Should choose DISPROVEBEST"
    print(f"Expected: {n2}, Got: {node}")
    assert node == n2, "Test 1 failed: Should choose node with lower beta (N2)"
    print("Test 1 passed (case1 and 3)")

    # Test 2: Case 5 — α1 > α2, β1 == β2 → PROVEBEST
    n1 = GameStateNode("N1", alpha=6, beta=2)
    n2 = GameStateNode("N2", alpha=5, beta=2)
    strategy, node = tl_two_relevant_nodes([n1, n2])
    print(f"Expected: PROVEBEST, Got: {strategy}")
    assert strategy == PROVEBEST, "Test 2 failed: Should choose PROVEBEST"
    print(f"Expected: {n1}, Got: {node}")
    assert node == n1, "Test 2 failed: Should choose node with higher alpha (N1)"
    print("Test 2 passed (case5)")

    # Test 3: Case 6 — α1 > α2, β1 < β2 → PROVEBEST
    n1 = GameStateNode("N1", alpha=7, beta=1)
    n2 = GameStateNode("N2", alpha=5, beta=3)
    strategy, node = tl_two_relevant_nodes([n1, n2])
    print(f"Expected: PROVEBEST, Got: {strategy}")
    assert strategy == PROVEBEST, "Test 3 failed: Should choose PROVEBEST"
    print(f"Expected: {n1}, Got: {node}")
    assert node == n1, "Test 3 failed: Should explore node with higher alpha (N1)"
    print("Test 3 passed (case6)")


    # Test 4: Case 2 (α1 == α2, β1 == β2) — theoretically any strategy, test it picks *one*
    n1 = GameStateNode("N1", alpha=4, beta=2)
    n2 = GameStateNode("N2", alpha=4, beta=2)
    strategy, node = tl_two_relevant_nodes([n1, n2])
    assert strategy in [PROVEBEST, DISPROVEBEST], "Test 4 failed: Should pick any strategy"
    print(f"Expected: Whatever, Got: {strategy}")
    print(f"Expected: {n1} or {n2}, Got: {node}")
    assert node in [n1, n2], "Test 4 failed: Should pick any node"
    print("Test 4 passed (case2)")

    # Test 5: Case 4 — α1 > α2, β1 > β2 → we compute probabilities
    n1 = GameStateNode("N1", alpha=7, beta=5)
    n2 = GameStateNode("N2", alpha=5, beta=3)
    strategy, node = tl_two_relevant_nodes([n1, n2])
    # Expected: compute probabilities to decide
    assert strategy in [PROVEBEST, DISPROVEBEST], "Test 5 failed: Should select based on computed probabilities"
    # Node depends on strategy:
    print(f"Expected: PROVEBEST, Got: {strategy}")
    if strategy == PROVEBEST:
        print(f"Expected: {n1}, Got: {node}")
        assert node == n1, "Test 5 failed: PROVEBEST -> pick N1"
    else:
        print(f"Expected: {n2}, Got: {node}")
        assert node == n2, "Test 5 failed: DISPROVEBEST -> pick N2"
    print("Test 5 passed (case4)")

    print("All tests passed for tl_two_relevant_nodes!")



# test_tl_select_relevant_nodes()
test_tl_two_relevant_nodes()


from main import GameStateNode, expand, update_parent

# epsilon = 1e-6

def tl_select_relevant_nodes(root):
    """
    Remove all the nodes that are already not relevant
    (their best scenario is already worst than the worst one of the others)
    """
    nodes = root.children
    if not nodes:
        return []
    relevant_nodes = []
    sorted_nodes = sorted(nodes, key=lambda i: i.alpha, reverse=True)
    best_pess_value = max(node.beta for node in sorted_nodes)
    for j in sorted_nodes:
        if j.alpha > best_pess_value:
            relevant_nodes.append(j)
    return relevant_nodes

def tl_two_relevant_nodes(relevant_nodes):
    """
    Case 1. alpha1 = alpha2 and beta1 > beta2. DISPROVEBEST
    Case 2. alpha1 = alpha2 and beta1 = beta2. WHATEVER
    Case 3. alpha1 = alpha2 and beta1 < beta2. DISPROVEBEST
    Case 4. alpha1 > alpha2 and beta1 > beta2. Probability of failure
    Case 5. alpha1 > alpha2 and beta1 = beta2. PROVEBEST
    Case 6. alpha1 > alpha2 and beta1 < beta2. PROVEBEST
    "For each of theses cases we shall develop a rule for determining which
    strategy is to be selected", in this case, we only use the 2nd principle:
    "Attempt to choose the strategy that has the highest probability of total success"
    ~ Palay 3.1. Trees with two relevant nodes
    
    Return value: The strategy and the top-level node to explore
    """

    first_node = relevant_nodes[0]
    a1 = first_node.alpha
    b1 = first_node.beta
    second_node = relevant_nodes[1]
    a2 = second_node.alpha
    b2 = second_node.beta
    if (a1 > a2): #Cases 4/5/6
        if (b1 > b2): #Case 4
            fail_probability_provebest = (a2 - b1) / (a1 - b1)
            fail_probability_disprovebest = (a2 - b1) / (a2 - b2)
            if (fail_probability_provebest < fail_probability_disprovebest): 
                return "PROVEBEST", first_node
            else: # If equal, could be interesting to use the least recently used strat
                return ("DISPROVEBEST"), second_node
        else: #Cases 5/6
            return ("PROVEBEST"), first_node
    else: #Cases 1/2/3
        if (b1 == b2): #Case 2
            return ("PROVEBEST" if b1 % 2 == 1 else "DISPROVEBEST"), first_node 
        else: #Cases 1/3
            return ("DISPROVEBEST"), second_node
    
def tl_multiple_relevant_nodes(relevant_nodes):
    """
    Return value: The strategy and the top-level node to explore
    """
    #"If the best nodes have the same top optmistic value, we need to separate them." ~ Palay
    top_optimistic_value = max(node.alpha for node in relevant_nodes)
    top_nodes = [node for node in relevant_nodes if node.alpha == top_optimistic_value]

    if len(top_nodes) > 1:
        lowest_beta_in_top_nodes = min(top_nodes, key=lambda node: node.beta)
        return "DISPROVEBEST", lowest_beta_in_top_nodes

    #A node is embedded in the range of the best node
    top_pessimistic_value = max(node.beta for node in relevant_nodes)
    best_node = relevant_nodes[0]
    if best_node.beta <= top_pessimistic_value:
        return "PROVEBEST", best_node
    
    #Last possibility: one node has the highest alpha and beta -> check probability of failure of 
    #Provebest and Disprovebest
    fail_probability_provebest = (relevant_nodes[1].alpha - best_node.beta) / (best_node.alpha - best_node.beta)
    fail_probability_disprovebest = 0
    for n in relevant_nodes and fail_probability_disprovebest < fail_probability_provebest:
        actual_fail_probability = (n.alpha - best_node.beta) / (n.alpha - n.beta)
        fail_probability_disprovebest += actual_fail_probability
    #Provebest should be better until the number of remaining nodes is small
    if fail_probability_disprovebest < fail_probability_provebest:
        return "DISPROVEBEST", relevant_nodes[1]
    else: # If equal, could be interesting to use the least recently used strat
        return "PROVEBEST", best_node


###CARE ABOUT DIVISION BY 0

def ll_next_node_selection(strategy ,current_node, value_lambda, value_gamma):
    """
    4 possibilities depending on if we use PROVEBEST/DISPROVEBEST and if it's AI/OPPPONENT turn
    """
    if strategy == "PROVEBEST":
        if current_node.ball_vel[0] < 0: #AI TURN ?
            #node with the highest probability to raise the pessimistic value of the current_node
            next_to_explore = max(current_node.children, key=lambda node: ((node.alpha - value_lambda) / (node.alpha - node.beta)))
        else: #OPPONENT turn ?
            next_to_explore = max(current_node.children, key=lambda node: ((node.alpha - (-(value_lambda + value_gamma) / 2)) / (node.alpha - node.beta)))
    else: #DISPROVEBEST
        if current_node.ball_vel[0] < 0: #AI TURN ?
            next_to_explore = max(current_node.children,  key=lambda node: ((node.alpha - (value_lambda + value_gamma) / 2) / (node.alpha - node.beta)))
        else: #OPPONENT turn ?
            next_to_explore = max(current_node.children, key=lambda node: ((node.alpha - (-value_gamma) / (node.alpha - node.beta))))
    return next_to_explore

def ll_search(strategy, current_node, value_lambda, value_gamma):
    if not current_node.children:
        expand(current_node)
    new_optimistic_value = -max(child.beta for child in current_node.children)
    new_pessimistic_value = -max(child.alpha for child in current_node.children)
    while (new_optimistic_value != current_node.alpha and new_pessimistic_value != current_node.beta):
        next_node = ll_next_node_selection(strategy, current_node, value_lambda, value_gamma)
        ll_search(strategy, next_node, value_lambda, value_gamma)
        new_optimistic_value = -max(child.beta for child in current_node.children)
        new_pessimistic_value = -max(child.alpha for child in current_node.children)
    current_node.alpha = new_optimistic_value
    current_node.beta = new_pessimistic_value
        
    
def tl_search(root):
    expand(root)
    while (True):
        relevant_nodes = tl_select_relevant_nodes(root)
        if (relevant_nodes.len() == 1):
            return (relevant_nodes[0])
        elif (relevant_nodes.len() == 2):
            strategy, current_node = tl_two_relevant_nodes(relevant_nodes)
        else:
            strategy, current_node = tl_multiple_relevant_nodes(relevant_nodes)
        value_lambda = max(node.alpha for node in relevant_nodes if node != current_node)
        value_gamma = max(current_node.beta, max(node.beta for node in relevant_nodes if node != current_node ))
        ll_search(strategy, current_node, value_lambda, value_gamma)
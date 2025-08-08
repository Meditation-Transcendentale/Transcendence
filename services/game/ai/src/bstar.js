import { GameStateNode } from "./GameStateNode";
import { expand } from "./expand"

/**
 * Remove all the nodes that are already not relevant (best case is already worse than worst from others)
 * @param {*} root 
 */
function topLevelSelectRelevantNodes(root) {
    const nodes = root.children;
    if (!nodes)
        return [];
    const relevantNodes = [];
    const sortedNodes = nodes.sort((a, b) => b.evaluation.alpha - a.evaluation.alpha);
    const bestPessValue = Math.max(...sortedNodes.map(node => node.evaluation.beta));
    for (j of sortedNodes) {
        if (j.evaluation.alpha > bestPessValue)
            relevantNodes.push(j);
    }
    return (relevantNodes);
}

/**
 *  Case 1. alpha1 = alpha2 and beta1 > beta2. DISPROVEBEST
    Case 2. alpha1 = alpha2 and beta1 = beta2. WHATEVER
    Case 3. alpha1 = alpha2 and beta1 < beta2. DISPROVEBEST
    Case 4. alpha1 > alpha2 and beta1 > beta2. Probability of failure
    Case 5. alpha1 > alpha2 and beta1 = beta2. PROVEBEST
    Case 6. alpha1 > alpha2 and beta1 < beta2. PROVEBEST
    "For each of theses cases we shall develop a rule for determining which
    strategy is to be selected", in this case, we only use the 2nd principle:
    "Attempt to choose the strategy that has the highest probability of total success"
    ~ Palay 3.1. Trees with two relevant nodes
 * @param {*} relevantNodes 
 */
function topLevelTwoRelevantNodes(relevantNodes) {
    const firstNode = relevantNodes[0];
    const a1 = firstNode.evaluation.alpha;
    const b1 = firstNode.evaluation.beta;
    const secondNode = relevantNodes[1];
    const a2 = secondNode.evaluation.alpha;
    const b2 = secondNode.evaluation.beta;
    if (a1 > a2) { //Cases 4/5/6
        if (b1 > b2) { //Case 4
            const failProbabilityProvebest = (a2 - b1) / (a1 - b1);
            const failProbabilityDisprovebest = (a2 - b1) / (a2 - b2);
            if (failProbabilityProvebest < failProbabilityDisprovebest) {
                return {
                    strategy: 1, //PROVEBEST
                    nodeToExplore: firstNode
                };
            } else { //Could add "equal" state which would lead to use the least recently used strategy
                return {
                    strategy: 0, //DISPROVEBEST
                    nodeToExplore: secondNode
                };
            }
        } else { //Cases 5/6
            return {
                strategy: 1, //PROVEBEST
                nodeToExplore: firstNode
            };
        }
    } else { //Cases 1/2/3
        if (b1 == b2) //Case 2 "random"
        {
            return {
                strategy: b1 % 2 == 1 ? 1 : 0, //PROVEBEST if beta from first node is odd and DISPROVEBEST if not xd
                nodeToExplore: firstNode
            };
        } else { //Cases 1/3
            return {
                strategy: 0, //DISPROVEBEST
                nodeToExplore: secondNode
            };
        }
    }
}


function topLevelMultipleRelevantNodes(relevantNodes) {
    //"If the bests nodes have the same top optmistic value, we need to separate them." ~ Palay
    const topOptimisticValue = Math.max(...relevantNodes.map(node => node.evaluation.alpha));
    const topNodes = relevantNodes.filter(node => node.evaluation.alpha === topOptimisticValue);

    if (topNodes.length > 1) {
        const lowestBetaInTopNodes = topNodes.children.reduce((maxNode, node) => {
            return node.evaluation.beta < maxNode.evaluation.beta ? node : maxNode;
        });
        return {
            strategy: 1, //DISPROVEBEST
            nodeToExplore: lowestBetaInTopNodes
        };
    }

    //A node is embedded in the range of the best node
    const topPessimisticValue = Math.max(...relevantNodes.map(node => node.evaluation.beta));
    const bestNode = relevantNodes[0];
    if (bestNode.evaluation.beta <= topPessimisticValue) {
        return {
            strategy: 0, //PROVEBEST
            nodeToExplore: bestNode
        };
    }

    //Last possibility: one node has the highest alpha and beta -> check probability of failure of 
    //Provebest and Disprovebest
    const failProbabilityProvebest = (relevantNodes[1].evaluation.alpha - bestNode.evaluation.beta) / (bestNode.evaluation.alpha - bestNode.evaluation.beta);
    let failProbabilityDisprovebest = 0;

    for (const n of relevantNodes) {
        const actualFailProbability = (n.evaluation.alpha - bestNode.evaluation.beta) / (n.evaluation.alpha - n.evaluation.beta);
        failProbabilityDisprovebest += actualFailProbability;
    }
    //Provebest should be better until the number of remaining nodes is small
    if (failProbabilityDisprovebest < failProbabilityProvebest) {
        return {
            strategy: 1, //DISPROVEBEST
            nodeToExplore: relevantNodes[1]
        };
    } else { //Could add "equal" state which would lead to use the least recently used strategy
        return {
            strategy: 0, //PROVEBEST
            nodeToExplore: bestNode
        };
    }
}

/**
 * 
 * @param {*} strategy PROVEBEST/DISPROVEBEST
 * @param {*} currentNode maybe the one...
 * @param {*} lambda 
 * @param {*} gamma 
 */
function lowLevelNextNodeSelection(strategy, currentNode, lambda, gamma) {
    let nextNodeToExplore;
    if (strategy === 0) { //PROVEBEST
        if (currentNode.ballState.ballVel[0] <= 0) { //AI TURN ?
            //node with the highest probability to raise the pessimistic value of the currentNode
            nextNodeToExplore = currentNode.children.reduce((maxNode, node) => {
                const currentScore = (node.evaluation.alpha - lambda) / (node.evaluation.alpha - node.evaluation.beta);
                const maxScore = (maxNode.evaluation.alpha - lambda) / (maxNode.evaluation.alpha - maxNode.evaluation.beta);
                return currentScore > maxScore ? node : maxNode;
            });
        } else { //PLAYER TURN
            nextNodeToExplore = currentNode.children.reduce((maxNode, node) => {
                const currentScore = (node.evaluation.alpha - (-(lambda + gamma) / 2)) / (node.evaluation.alpha - node.evaluation.beta);
                const maxScore = (maxNode.evaluation.alpha - (-(lambda + gamma) / 2)) / (maxNode.evaluation.alpha - maxNode.evaluation.beta);
                return currentScore > maxScore ? node : maxNode;
            });
        }
    } else { //DISPROVEBEST
        if (currentNode.ballState.ballVel[0] <= 0) { //AI TURN ?
            nextNodeToExplore = currentNode.children.reduce((maxNode, node) => {
                const currentScore = (node.evaluation.alpha - (lambda + gamma) / 2) / (node.evaluation.alpha - node.evaluation.beta);
                const maxScore = (maxNode.evaluation.alpha - (lambda + gamma) / 2) / (maxNode.evaluation.alpha - maxNode.evaluation.beta);
                return currentScore > maxScore ? node : maxNode;
            });
        } else { //PLAYER TURN
            nextNodeToExplore = currentNode.children.reduce((maxNode, node) => {
                const currentScore = (node.evaluation.alpha - (-gamma)) / (node.evaluation.alpha - node.evaluation.beta);
                const maxScore = (maxNode.evaluation.alpha - (-gamma)) / (maxNode.evaluation.alpha - maxNode.evaluation.beta);
                return currentScore > maxScore ? node : maxNode;
            });
        }
    }
}


/**
 * 
 * @param {*} strategy PROVEBEST/DISPROVEBEST
 * @param {*} currentNode maybe the one...
 * @param {*} lambda 
 * @param {*} gamma 
 */
function lowLevelSearch(strategy, currentNode, lambda, gamma) {
    if (!currentNode.children || currentNode.children.length === 0) {
        expand(currentNode);
    }

    let newOptimisticValue = -Math.max(...currentNode.children.map(child => child.evaluation.beta));
    let newPessimisticValue = -Math.max(...currentNode.children.map(child => child.evaluation.alpha));

    while (newOptimisticValue !== currentNode.evaluation.alpha && newPessimisticValue !== currentNode.evaluation.beta) {
        const nextNode = lowLevelNextNodeSelection(strategy, currentNode, lambda, gamma);
        lowLevelSearch(strategy, nextNode, lambda, gamma);

        newOptimisticValue = -Math.max(...currentNode.children.map(child => child.evaluation.beta));
        newPessimisticValue = -Math.max(...currentNode.children.map(child => child.evaluation.alpha));
    }

    currentNode.evaluation.alpha = newOptimisticValue;
    currentNode.evaluation.beta = newPessimisticValue;
}

function topLevelSearch(root) {
    expand(root);
    while (true) {
        const relevantNodes = topLevelSelectRelevantNodes(root);
        let nextMove;
        if (relevantNodes.length <= 1)
            return (relevantNodes[0]);
        else if (relevantNodes.length == 2)
            nextMove = topLevelTwoRelevantNodes(relevantNodes);
        else
            nextMove = topLevelMultipleRelevantNodes(relevantNodes);

        const lambda = Math.max(...relevantNodes
            .filter(node => node !== nextMove.nodeToExplore)
            .map(node => node.evaluation.alpha)
        );

        const gamma = Math.max(
            nextMove.nodeToExplore.evaluation.beta,
            Math.max(...relevantNodes
                .filter(node => node !== nextMove.nodeToExplore)
                .map(node => node.evaluation.beta)
            )
        );
        lowLevelSearch(nextMove.strategy, nextMove.nodeToExplore, lambda, gamma);
    }
}
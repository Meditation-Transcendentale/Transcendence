import { MAP_HEIGHT, PADDLE_HEIGHT, WALL_SIZE } from './constants.js';

export function h_alignment(paddleY, targetY) {
    const alignment_error = Math.abs(targetY - paddleY);
    const alignment_score = -alignment_error;
    return alignment_score;
}

export function h_return_quality(velY) {
    const angle_penalty = Math.abs(velY);
    const return_quality_score = -Math.abs(1 - angle_penalty);
    return return_quality_score;
}

export function h_opponent_difficulty(targetY, opponentPaddle) {
    const opponent_difficulty_score = Math.abs(targetY - opponentPaddle)
    return opponent_difficulty_score;
}

export function h_centering(myPaddle) {
    const center_bias = -Math.abs(myPaddle) * 0.5;
    return center_bias;
}

export function h_corner_target(targetY) {
    let corner_score;
    if (Math.abs(targetY) > (MAP_HEIGHT / 5))
        corner_score = 10;
    else
        corner_score = 0;
    return corner_score;
}
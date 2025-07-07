#!/usr/bin/env python3
import sys, json, time, math
from asciimatics.screen import Screen

TIMEOUT = 1.0  # seconds before showing “Waiting for data” hint
MAP_RADIUS = 50.0  # fixed world radius

def draw_frame(screen, state):
    w, h = screen.width, screen.height
    screen.clear()

    # 1) Draw circular boundary
    for deg in range(0, 360, 4):
        rad = math.radians(deg)
        # world coords on circle
        wx = MAP_RADIUS * math.cos(rad)
        wy = MAP_RADIUS * math.sin(rad)
        # map to terminal
        tx = int((wx / MAP_RADIUS) * ((w - 2) / 2) + w / 2)
        ty = int((h / 2) - (wy / MAP_RADIUS) * ((h - 2) / 2))
        screen.print_at('•', tx, ty)

    # 2) Mapping functions (fixed extents)
    def map_x(x):
        return int((x / MAP_RADIUS) * ((w - 2) / 2) + w / 2)
    def map_y(y):
        return int((h / 2) - (y / MAP_RADIUS) * ((h - 2) / 2))

    # 3) Draw paddles
    # for p in state.get('paddles', []):
    #     # extract position & height
    #     if 'x' in p and 'y' in p:
    #         px, py = p['x'], p['y']
    #         raw_h    = p.get('h', 1)
    #     else:
    #         px = p['position']['x']
    #         py = p['position']['y']
    #         raw_h = p['collider'].get('height', 1)
    #
    #     tx = map_x(px)
    #     ty = map_y(py)
    #     ph = max(1, int((raw_h / MAP_RADIUS) * ((h - 2) / 2)))
    #
    #     for dy in range(-ph // 2, ph // 2 + 1):
    #         screen.print_at('█', tx, ty + dy)

    # 4) Draw balls
    for b in state.get('balls', []):
        bx = map_x(b['x'])
        by = map_y(b['y'])
        screen.print_at('●', bx, by)

    screen.refresh()

def main(screen):
    start = time.time()
    for line in sys.stdin:
        # hint if we never got data
        if time.time() - start > TIMEOUT and start != 0:
            screen.clear()
            screen.print_at("Waiting for JSON on stdin…", 2, 2)
            screen.refresh()
            start = 0

        try:
            state = json.loads(line)
        except json.JSONDecodeError:
            continue

        draw_frame(screen, state)
        time.sleep(1/60)

if __name__ == "__main__":
    Screen.wrapper(main)


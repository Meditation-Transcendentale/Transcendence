#include "raylib.h"
#include <math.h>

int main() {
    InitWindow(800, 600, "Local Raylib Test");
    SetTargetFPS(60);

    float angle = 0.0f;

    while (!WindowShouldClose()) {
        angle += 0.02f;

        BeginDrawing();
        ClearBackground(RAYWHITE);

        DrawCircle(400, 300, 80, RED);
        DrawRectanglePro(
            (Rectangle){ 400, 300, 200, 60 },
            (Vector2){ 100, 30 },
            angle * (180.0f / PI),
            BLUE
        );

        EndDrawing();
    }

    CloseWindow();
    return 0;
}

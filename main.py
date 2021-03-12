import sys, pygame, math

# Compute the area by triangle fan
def area(coords):
    area = 0
    for i in range(len(coords)):
        v1,v2,v3 = 0,i+1,i+2
        tr_area = math.fabs(0.5 * (
            coords[v1].x*(coords[v2].y - coords[v3].y) +
        ))
        tr_area = abs(0.5*(
            x_cords[v1]*(y_cords[v2]-y_cords[v3])+
            x_cords[v2]*(y_cords[v3]-y_cords[v1])+
            x_cords[v3]*(y_cords[v1]-y_cords[v2])))
        area += tr_area
    return area

pygame.init()

size = width, height = 320, 240
speed = [2, 2]
black = 0, 0, 0
green = 0, 255, 0
red = 255, 0, 0

screen = pygame.display.set_mode(size)

ball = pygame.image.load("intro_ball.gif")
ballrect = ball.get_rect()
points = [
    pygame.Vector2(50,50), 
    pygame.Vector2(50, 100), 
    pygame.Vector2(100, 75)]
morepoints = [
    pygame.Vector2(60,50), 
    pygame.Vector2(60, 100), 
    pygame.Vector2(110, 75)]

while 1:
    for event in pygame.event.get():
        if event.type == pygame.QUIT: sys.exit()

    ballrect = ballrect.move(speed)
    if ballrect.left < 0 or ballrect.right > width:
        speed[0] = -speed[0]
    if ballrect.top < 0 or ballrect.bottom > height:
        speed[1] = -speed[1]

    screen.fill(black)
    pygame.draw.polygon(screen, green, points)
    pygame.draw.polygon(screen, red, morepoints)
    screen.blit(ball, ballrect)
    pygame.display.flip()
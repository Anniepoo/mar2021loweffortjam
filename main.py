import sys, pygame
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
import sys, pygame, math

# Compute the area by triangle fan
def area(coords):
    area = 0
    for i in range(len(coords)-2):
        v1,v2,v3 = 0,i+1,i+2
        area += math.fabs(0.5 * (
            coords[v1].x*(coords[v2].y - coords[v3].y) +
            coords[v2].x*(coords[v3].y - coords[v1].y) +
            coords[v3].x*(coords[v1].y - coords[v2].y)
        ))
    if( area == 0.0):
        print("zero")
        return 1.0

    return area

def squeeze(ref, mobile, proportion):
    mobile.x = ref.x + (mobile.x - ref.x) * proportion
    mobile.y = ref.y + (mobile.y - ref.y) * proportion

# keep this puppy on screen
def boxin(pt):
    a = pt.x
    b = pt.y
    pt.x, pt.y = min(max(0.0,pt.x), 800.0), min(max(0.0,pt.y), 600.0)
    if( a != pt.x or b != pt.y):
        print("changed")

def circumference(poly):
    circ = 0.0
    for i in range(1,len(poly)):
        circ += poly[i].distance_to(poly[i-1])
    return circ

# one frame's total blob move
def moveblob(blob):
    for pt in blob:
        pt.y += 3 # Aristotelian gravity

    for iter in range(10):
        prop = math.sqrt(6000.0 / area(blob))
        
        squeeze(blob[-1], blob[0], prop)
        boxin(blob[0])
        for i in range(1,len(blob)):
            squeeze(blob[i-1], blob[i], prop)
            boxin(blob[i])




pygame.init()

size = width, height = 800, 600
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
    pygame.Vector2(150, 75)]
morepoints = [
    pygame.Vector2(60,50), 
    pygame.Vector2(60, 100), 
    pygame.Vector2(110, 75)]

print(area(points))

blob = []
for i in range(31):
    blob.append(
        pygame.Vector2(
            400 + 100 * math.sin(math.pi * 2.0 * i / 31.0),
            300 + 100 * math.cos(math.pi * 2.0 * i / 31.0)
    )   )



while 1:
    pygame.time.wait(30)
    for event in pygame.event.get():
        if event.type == pygame.QUIT: sys.exit()

    ballrect = ballrect.move(speed)
    if ballrect.left < 0 or ballrect.right > width:
        speed[0] = -speed[0]
    if ballrect.top < 0 or ballrect.bottom > height:
        speed[1] = -speed[1]
    moveblob(blob)

    screen.fill(black)
    pygame.draw.polygon(screen, green, points)
    pygame.draw.polygon(screen, red, blob)
    screen.blit(ball, ballrect)
    pygame.display.flip()
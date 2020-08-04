from engine import app
from flask import jsonify,request,json
from math import ceil
from datetime import datetime as dt
import logging

log_f="%(levelname)s %(asctime)s - %(message)s"
logging.basicConfig(
    filename="monitor.txt",
    level=logging.INFO,
    format=log_f,
    filemode='a'
    )
l=logging.getLogger()

@app.route("/", methods=['POST'])
@app.route("/home", methods=['POST'])
def home():
    try:
        
        if request.is_json:
            pr=process()
            return jsonify(pr)
        else:
            return 'Incorrect json format',400
    except Exception as e:
        l.warning(f"Exception Occured -> {str(e)}")
        es=f'exception occured  --> {str(e)}\n'
        return(es)

def process():
            req         = request.get_json()
            l.info(f"Incoming Json {req}")
            player      = str(req.get('ply'))
            dimensions  = [int(i) for i in req.get('dim').split(',')]
            player_pos  = [int(i) for i in req.get ('pp').split(',')]
            target_pos  = [int(i) for i in req.get ('tp').split(',')]
            dist        = int(req.get('dist'))         
            st=dt.utcnow()
            cnt=compute(dimensions,player_pos,target_pos,dist)
            et=dt.utcnow()
            tt=str(et-st) 
            resp        = {
                            'player':player,
                            'no_of_direction':cnt,
                            'time taken':tt
                             }
            l.info(f"Json Response {resp}") 
            return resp 
def gcd(a, b):
    a, b = abs(a), abs(b)
    while b > 0:
        a, b = b, a % b
    return a

def mirrored_position(dimensions,target_pos,r,c):
    coord1 = dimensions[0]*(c)+((dimensions[0]-target_pos[0]) if c%2==1 else target_pos[0])
    coord2 = dimensions[1]*(r)+((dimensions[1]-target_pos[1]) if r%2==1 else target_pos[1])
    return (coord1,coord2)

def get_unit_vector(vect):
    if vect[0] == 0 and vect[1] == 0:
        return 0, 0
    elif vect[0] == 0:
        return 0, 1 if vect[1] > 0 else 0,-1
    elif vect[1] == 0:
        return 1,0 if vect[0] > 0 else -1, 0
    else:
        g = gcd(*vect)
        return (vect[0]/g, vect[1]/g)


def compute(dimensions, your_position, target_pos, distance):

    dist_to_target=((your_position[0]-target_pos[0])**2+(your_position[1]-target_pos[1])**2)**0.5
    #logic to filter 0 or 1 unit of distance
    if distance <  dist_to_target:
        return 0
    if distance == dist_to_target:
        return 1
        
    cols=distance / dimensions[0]+1
    rows=distance / dimensions[1]+1
    dirs=dict();    rows=ceil(rows);    cols=ceil(cols)
    # print(f"range {rows} , {cols}")
    for r in range(-rows,rows+1):
        # print(f"r {r}")
        for c in range(-cols,cols+1):
            # print(f"c {c}")
            target_mirrored = mirrored_position(dimensions,target_pos,r,c)
            player_mirrored = mirrored_position(dimensions,your_position,r,c)
            dir_to_target   = get_unit_vector([target_mirrored[0]-your_position[0],target_mirrored[1]-your_position[1]])

            dist_to_target  = ((your_position[0]-target_mirrored[0])**2+(your_position[1]-target_mirrored[1])**2)**0.5

            dist_to_me      = ((your_position[0]-player_mirrored[0])**2+
                               (your_position[1]-player_mirrored[1])**2)**0.5 #equivalent of sqrt
            dir_to_me       = get_unit_vector([player_mirrored[0]-your_position[0],player_mirrored[1]-your_position[1]])

            if dist_to_me <= distance and dist_to_me>0:
                if dir_to_me in dirs.keys():
                    if dirs[dir_to_me][1]>=dist_to_me:
                        dirs[dir_to_me]=(False,dist_to_me)
                else:
                    dirs[dir_to_me]=(False,dist_to_me)
            if dist_to_target <= distance and dist_to_target>0:
                if dir_to_target in dirs.keys():
                    if dirs[dir_to_target][1]>dist_to_target:
                        dirs[dir_to_target]=(True,dist_to_target)
                else:
                    dirs[dir_to_target]=(True,dist_to_target) 
    cnt=0

    for direction in dirs:
        if dirs[direction][0]==True:
            cnt+=1

    return (cnt)

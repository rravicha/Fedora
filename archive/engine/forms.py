from math import ceil
from datetime import datetime as dt

class Compute:
    def __init__(self,req):
            
            self.player      = str(req.get('ply'))
            self.dimensions  = [int(i) for i in req.get('dim').split(',')]
            self.player_pos  = [int(i) for i in req.get ('pp').split(',')]
            self.target_pos  = [int(i) for i in req.get ('tp').split(',')]
            self.dist        = int(req.get('dist'))         
            
    def validate(self):
        out="error"
        return True,out
    
    def calculate(self):
        st=dt.utcnow()
        try:
            cnt=Compute.compute(self.dimensions,self.player_pos,self.target_pos,self.dist)
        except Exception as e:
            return str(e)
            # return(f"exception occured in calculate() {e}")
        et=dt.utcnow()
        tt=str(et-st) 
        resp        = {
                        'player':self.player,
                        'no_of_direction':cnt,
                        'time taken':tt
                         }
        
        return resp 

    @staticmethod
    def gcd(a, b):
        a, b = abs(a), abs(b)
        while b > 0:
            a, b = b, a % b
        return a

    @staticmethod
    def mirrored_position(dimensions,target_pos,r,c):
        coord1 = dimensions[0]*(c)+((dimensions[0]-target_pos[0]) if c%2==1 else target_pos[0])
        coord2 = dimensions[1]*(r)+((dimensions[1]-target_pos[1]) if r%2==1 else target_pos[1])
        return (coord1,coord2)

    @staticmethod
    def get_unit_vector(vect):
        if vect[0] == 0 and vect[1] == 0:
            return 0, 0
        elif vect[0] == 0:
            return 0, 1 if vect[1] > 0 else 0,-1
        elif vect[1] == 0:
            return 1,0 if vect[0] > 0 else -1, 0
        else:
            g = Compute.gcd(*vect)
            return (vect[0]/g, vect[1]/g)
            

    @staticmethod        
    def compute(dimensions, your_position, target_pos, distance):

        dist_to_target=((your_position[0]-target_pos[0])**2+(your_position[1]-target_pos[1])**2)**0.5
        #logic to filter 0 or 1 unit of distance
        if distance <  dist_to_target:
            return 0
        if distance == dist_to_target:
            return 1

        cols=distance / dimensions[0]+1
        rows=distance / dimensions[1]+1
        dirs=dict();    rows=int(ceil(rows));    cols=int(ceil(cols))
        # print(f"range {rows}  {cols}")
        for r in range(-rows,rows+1):
            # print(f"r {r}")
            for c in range(-cols,cols+1):
                # print(f"c {c}")
                target_mirrored = Compute.mirrored_position(dimensions,target_pos,r,c)
                player_mirrored = Compute.mirrored_position(dimensions,your_position,r,c)
                dir_to_target   = Compute.get_unit_vector([target_mirrored[0]-your_position[0],target_mirrored[1]-your_position[1]])

                dist_to_target  = ((your_position[0]-target_mirrored[0])**2+(your_position[1]-target_mirrored[1])**2)**0.5

                dist_to_me      = ((your_position[0]-player_mirrored[0])**2+
                                   (your_position[1]-player_mirrored[1])**2)**0.5 #equivalent of sqrt
                dir_to_me       = Compute.get_unit_vector([player_mirrored[0]-your_position[0],player_mirrored[1]-your_position[1]])

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






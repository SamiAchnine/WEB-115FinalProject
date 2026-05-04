# FOR DEBUG USE ONLY -- DO NOT SHIP UNLESS YOU WANT TO FLEX TO MR GARDNER HOW GOOD YOU ARE AT PROGRAMMING

import os

path = ".//songs//sf//"
dir_list = os.listdir(path)

for i in range(len(dir_list)):
    with open("songs.txt", "a", encoding="utf-8") as f:
        song = dir_list[i]
        f.write(f'let sf{i} = new Song("Default", "{song}", "{song[:-4]}", sf, 140);\nsf.addSong(sf{i});\n')
        
# Code-Foo Grid

## Description:
Program that generates and displays a 3x3 grid of random whole positive numbers (n) where 0 <= n <= 9. It then find all possible combinations of numbers that add up to the area of the grid with rules similar to Boggle.

## Instruction:
Clone repository.
From command line run 'node grid.js'

## Solution:
* Grid was implemented using nested arrays to represent each row.
* Valid Answers were saved using an Object with the sorted coordinates used as the key for instant lookup and to prevent duplicate answers having the same cells 
* Current chain uses an Object to keep track of the cells used in the chain and also instant lookup to see if cell had been previously used in current chain
* A recursive function is used to check the sum of current chain is less than the area of the grid.  If less than area the recursive function is used on all adjacent cells to the last cell added
* The recursive function ends any time it encounters an invalid cell, the sum of the chain is greater than the area, or if the cell has already been used in the current chain

## Implementation Notes:
Grid size can be scaled by changing line 115
example: var grid = makeGrid(4, 4);

Although the program can create and find solution for larger grids it does have issues with 5X5 and larger grids which can have thousands of valid answers.  BigO of O(n!) 

3X3 grids are usually done in 0.1s
4X4 grids and usually done under 0.5s
5X5 grids can take anywhere from 2s to over 30s with over 10000+ valid answers usually under 8s


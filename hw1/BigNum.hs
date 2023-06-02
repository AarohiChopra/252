{-
  Name: Aarohi Chopra
  Class: CS 252
  Assigment: HW1
  Date: 19th feb 2023
  Description: Big Number computations 
-}

module BigNum (
  BigNum,
  bigAdd,
  bigSubtract,
  bigMultiply,
  bigEq,
  bigDec,
  bigPowerOf,
  prettyPrint,
  stringToBigNum,
) where

type Block = Int -- An Int from 0-999

type BigNum = [Block]

maxblock = 1000

bigAdd :: BigNum -> BigNum -> BigNum
bigAdd x y = bigAdd' x y 0

bigAdd' :: BigNum -> BigNum -> Block -> BigNum
bigAdd' [] [] 0 = [] 
bigAdd' [] [] 1 = [1] 
bigAdd' (f:fr) [] c = mod (f+c) maxblock : bigAdd' fr [] 0
bigAdd' [] (s:sr) c = mod (s+c) maxblock : bigAdd' [] sr 0
bigAdd' (f:fr) (s:sr) c = mod (f+s+c) maxblock : bigAdd' fr sr (div (f+s+c) maxblock) 

bigSubtract :: BigNum -> BigNum -> BigNum
bigSubtract x y =
  if length x < length y
    then error "Negative numbers not supported"
    else reverse $ stripLeadingZeroes $ reverse result
      where result = bigSubtract' x y 0

stripLeadingZeroes :: BigNum -> BigNum
stripLeadingZeroes (0:[]) = [0]
stripLeadingZeroes (0:xs) = stripLeadingZeroes xs
stripLeadingZeroes xs = xs

-- Negative numbers are not supported, so you may throw an error in these cases
bigSubtract' :: BigNum -> BigNum -> Block -> BigNum
bigSubtract' [] [] 0 = []
bigSubtract' [] [] 1 = error "Invalid operation, Negative numbers are not supported"
bigSubtract' (f:fr) [] 0 = [f]
bigSubtract' (f:fr) [] 1 = if (f - 1) < 0 then (f - 1 + maxblock) : bigSubtract' fr [] 1 else (f - 1) : bigSubtract' fr [] 0
bigSubtract' (f:fr) (s:sr) c = if (f - s - c) < 0 then ((f - c + maxblock) - s) : bigSubtract' fr sr 1 else (f - s - c) : bigSubtract' fr sr 0 

bigEq :: BigNum -> BigNum -> Bool
bigEq _ _ = error "Your code here"

bigDec :: BigNum -> BigNum
bigDec x = bigSubtract x [1]

-- Handle multiplication following the same approach you learned in grade
-- school, except dealing with blocks of 3 digits rather than single digits.
-- If you are having trouble finding a solution, write a helper method that
-- multiplies a BigNum by an Int.
bigMultiply :: BigNum -> BigNum -> BigNum
bigMultiply [] [] = []
bigMultiply lst [] = []
bigMultiply [] lst  = []
bigMultiply [0] _ = [0]
bigMultiply _ [0] = [0]
bigMultiply lst (x:xr) = bigAdd (bigMultiply' lst x 0) (0: bigMultiply lst xr)

-- Handling the multiplication of the upper block part with single lower digit 
-- along with carry bits
bigMultiply' :: BigNum -> Block -> Block -> BigNum 
bigMultiply' [] x 0 = []
bigMultiply' [] x c = [c]
bigMultiply' (f:fr) x c = mod ((f*x)+c) maxblock : bigMultiply' fr x (div ((f*x)+c) maxblock) 

bigPowerOf :: BigNum -> BigNum -> BigNum
bigPowerOf [] [0] = [1]

prettyPrint :: BigNum -> String
prettyPrint [] = ""
prettyPrint xs = show first ++ prettyPrint' rest
   where (first:rest) = reverse xs

prettyPrint' :: BigNum -> String
prettyPrint' [] = ""
prettyPrint' (x:xs) = prettyPrintBlock x ++ prettyPrint' xs

prettyPrintBlock :: Int -> String
prettyPrintBlock x | x < 10     = ",00" ++ show x
                   | x < 100    = ",0" ++ show x
                   | otherwise  = "," ++ show x

stringToBigNum :: String -> BigNum
stringToBigNum "0" = [0]
stringToBigNum s = stringToBigNum' $ reverse s

stringToBigNum' :: String -> BigNum
stringToBigNum' [] = []
stringToBigNum' s | length s <= 3 = read (reverse s) : []
stringToBigNum' (a:b:c:rest) = block : stringToBigNum' rest
  where block = read $ c:b:a:[]

sig = "9102llaf"

-- Do the game fizzbuzz (http://en.wikipedia.org/wiki/Fizz_buzz).
-- Return a string counting from 1 to the specified number.
-- Replace numbers dvisible by 3 with "fizz" and numbers divisible
-- by 5 with "buzz".  If a number is divisible by both 3 and 5,
-- replace it with "fizzbuzz".

fizzbuzz :: Int -> String
fizzbuzz x | x < 0 = error "Non-negative numbers only"
fizzbuzz 0 = ""
fizzbuzz 1 = "1"
fizzbuzz x = 
         if (mod x 15) == 0 
            then fizzbuzz(x - 1) ++ " fizzbuzz"
         else if(mod x 3) == 0
            then fizzbuzz(x - 1) ++ " fizz"
         else if(mod x 5) == 0
            then fizzbuzz(x - 1) ++ " buzz"
         else 
            fizzbuzz(x - 1) ++ " " ++show x

main :: IO ()
main = do
  print (fizzbuzz 1)
  print (fizzbuzz 7)
  print $ fizzbuzz 99
  print $ fizzbuzz 0
  print $ fizzbuzz (-2)

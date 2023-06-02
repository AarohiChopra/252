fact :: Integer -> Integer
fact 0 = 0
fact n = n * (fact (n-1))


fact' :: Integer -> Integer -> Integer
fact' 0 accum = accum
fact' n accum = fact' (n-1) (n*accum)

fact2 :: Integer -> Integer -> Integer
fact2 n accum = if n == 0
    then accum
    else fact2 (n-1) (n*accum)


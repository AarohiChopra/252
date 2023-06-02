mydiv x y = 
      x >>= (\numer ->
      y >>= (\denom ->
      if demon > 0 
         then Just (div x y)
         else Nothing))

mydiv' x y = do 
         numer <- x
         demon <- y
         if denom > 0
            then Just (div x y)
            else Nothing 

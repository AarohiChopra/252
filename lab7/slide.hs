addMaybe m1 m2 = fmap (+) m1 <*> m2
main = do
 print $ addMaybe (Just 3) (Just 4)

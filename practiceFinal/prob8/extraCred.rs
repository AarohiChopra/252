use std::fmt::Display;

// Function types must be declared
fn print_arr<T: Display>(a: &[T]) -> () {
    for i in a {
        print!("{} ", i);
    }
    println!("");
}

fn main() {
    let mut nums = [9, 4, 22, 13, 11, 44, 8, 12, 1];
    print_arr(&nums[..]);

    let second = ... /* Add the appropriate function call to find_second_largest here */
    println!("The second largest elem in the array was {}", second);

    ... /* Add a function call to zero_out_pos, which should set a[5] to 0. */
    print_arr(&nums[..]);

    let second2 = ... /* Add the appropriate function call to find_second_largest here */
    println!("The second largest elem in the array was {}", second2);
}


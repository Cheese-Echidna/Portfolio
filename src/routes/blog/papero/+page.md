Papero is a generative art project. It started in js in 2021 and has since had many incarnations.

The current incarnation can be found [here](https://github.com/Cheese-Echidna/papero).

This blog post is going to cover some implementations and results from over the years, as well as discussing some of the algorithms that generate the images.

## Spiral

The original papero algorithm was conceived in 2021 and is now called *spiral*.
Spiral works by walking through the image in a spiral, setting each pixel to the average of the filled pixels around it. 
The image starts off with one pixel, and then the walk begins going clockwise around the starting pixel repeating until the entire image is filled in.
This algorithm sounds boring, and it is, in this state the entire image would end up the same colour as the starting pixel. 
However, if you just change the colour of the new pixel to be the average of the filled pixels around it, plus some slight randomness, the image becomes a chaotic and beautiful swirl of colour.

The oldest render from spiral I can find is from August 2023, from a variation called Neo (you can see that by that point we had started making revisions). Here it is:

<img alt="The oldest papero I can find" src="/blog_assets/papero/2023-08-21 14.11.20 Neo.png"/>

The pseudocode for that algorithm looks like this:

```rust
fn generate() -> Image {
    let mut image = Image::new();
    
    let (mut x, mut y) = random_pixel_near_middle();
    
    let initial_colour = random_colour();
    
    image.put_pixel(x, y, initial_colour);
    
    // This code moves 1, then 3, then 5, etc
    // This facilitates a spiral that never hits itself.
    for move_length in 1..(max(width, height) * 2).step_by(2) {
        for _right in 0..move_length {
            spiral_iteration(&mut image, (&mut x, &mut y), Direction::Right);
        }
        for _down in 0..move_length {
            spiral_iteration(&mut image, (&mut x, &mut y), Direction::Down);
        }
        for _left in 0..(move_length + 1) {
            spiral_iteration(&mut image, (&mut x, &mut y), Direction::Left);
        }
        for _up in 0..(move_length + 1) {
            spiral_iteration(&mut image, (&mut x, &mut y), Direction::Up);
        }
    }

    return image;
}

fn spiral_iteration(image: &mut Image, (x,y): (&mut u32, &mut u32), dir: Direction) {
    (x, y) = (x, y) + dir.move_in_direction();
    if !image.in_bounds(*x, *y) {
        return;
    }
    let colour = avg_adjacent_filled(image, *x, *y);
    image.set_pixel(*x, *y, colour);
}

```

Here is a render of an implementation of the same algorithm from 2025. 

<img alt="The newest papero I can find" src="/blog_assets/papero/Spiral.png"/>

## Fractals

One of the next interesting experiments was with fractals. I was originally very interested in Sierpinski's Triangle, originally coding it in python with Turtle. The performance of that algorithm was terrible, so I switched to doing it with pixels and doing the computation via Pascal's triangle (in case you didn't know, Pascal's triangle mod 2 is the same Sierpinski's triangle). 

<img alt="Sierpiński's Triangle" src="/blog_assets/papero/Sierpiński's Triangle.png"/>

Another famous fractal is the Mandelbrot set. I have spent hours tuning the functions that choose the colour for these visualisations.

Here it is in closeup:

<img alt="A closeup of the mandelbrot set" src="/blog_assets/papero/mandelcool.png"/>

Here is the "inverted mandelbrot set" which can be found by mapping z_0 to 1/z_0. Credit to [Paul Bourke](https://paulbourke.net/fractals/mandelbrot/) for the idea.

<img alt="The inverted mandelbrot set" src="/blog_assets/papero/Mandelbrot.png"/>

Here is the Juila set:

<img alt="Sierpiński's Triangle" src="/blog_assets/papero/Julia (Jazzmine).png"/>


## Bitwise Images
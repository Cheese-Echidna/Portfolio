## Into

I've been facinated with rendering for as long as I can remember. To me, the technology that turns shapes into pixels is magic. 

I have always enjoyed watching video's about rendering techniques and after I watched Acerola's [awesome video](https://www.youtube.com/watch?v=s-9UHZFBH08) about path tracing, I decided that I would give it a go. 

Now unfortunately I am not an experienced GPU programmer, so I was not about to create a real-time renderer, but had been using Rust for some time and thought that doing it in parrallel on the CPU would be good enough. 

I began coding in Rust; the basics of path tracing are quite simple:

1) Contruct the rays that make your scene

2) Find where those rays intersect with the scene's geometery

3) Reflect each ray off of the itersecting object

4) Repeat until number of bounces exhausted or ray is absorbed

But in this seemingly simple set of steps has an uncanny complexity. I really apreciated the book [Ray Tracing in One Weekend](https://raytracing.github.io/) in helping me realise some of the mistakes I made along the way. 

## Coding time

I started by laying out the rays to be traced, and calcuating the ray direction based on the pixel co-ordinates, which can be done as follows:


Let $x,y$ be the pixel co-ordinates in the output image, normalised for so that width and height range from -0.5 to 0.5.

$x,y \in [-0.5, 0,5]$

Let $I$ be the image dimensions 

Let $a=\frac{I_{width}}{I_{height}}$

Let $\vec{R}$ be the vector pointing to the camera's right.

Let $\vec{U}$ be the vector pointing to the camera's up.

Let $\vec{F}$ be the vector pointing to the camera's forward.

$\vec{v} = \vec{F} + [ \vec{R} \times (x \times a \times \tan({\frac{fov}{2}})) ] + [ \vec{U} \times (y \times \tan({\frac{fov}{2}})) ]$

$d=\hat{v}$

<br>

The code that calulates that is:

```rust
// Vec2 is a 2d floating point vector
// Some type conversions have been ommited for the sake of readbility
fn get_outgoing_ray(camera: &Camera, current_pixel: Vec2, image_dimensions: Vec2) -> Ray {
    // Convert pixel indices + random offset into [0..1] normalized coordinates
    let image_prop = current_pixel / image_dimensions;

    // Shift range from [0..1] to [-0.5..0.5] horizontally and vertically
    // Note that y is inverted because screen coords typically go down but we want up in camera space.
    let image_prop = Vec2::new(image_prop.x - 0.5, 0.5 - image_prop.y);

    // Horizontal field of view
    let tan_fov = (camera.hoz_fov.to_radians() / 2.0).tan();

    // Compute aspect ratio based on image dimensions
    let aspect_ratio = image_dimensions.x / image_dimensions.y;

    // Calculate horizontal and vertical offsets
    let right_offset = camera.right() * (image_prop.x * aspect_ratio * tan_fov);
    let up_offset = camera.up() * (image_prop.y * tan_fov);

    // Compute unit vector direction 
    let direction = (camera.forward() + right_offset + up_offset).normalize();

    // Construct the ray with the camera's location as origin.
    Ray::new(camera.location, direction)
}

```

I then sent the rays into the scene, tracing each until it hit a sphere (at this point the scene contained only spheres) or it didn't. If a ray hit a sphere, it was refected and then 
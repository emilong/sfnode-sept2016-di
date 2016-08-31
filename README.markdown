# Dependency Injection in Node

Presented at the [September SFNode Meetup](https://www.meetup.com/sfnode/events/225747576/).

Made using the awesome [Spectacle Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate).

## Viewing

Run `npm install`, then `npm start`.

Open a browser and hit [http://localhost:3000](http://localhost:3000).

## Example code

The example subdirectory contains a project with some of the ideas presented in the slides.
As per usual:

```shell
cd example
npm install
npm test
npm start
```

To use it:

```shell
# Create a todo
curl -XPOST localhost:7000/todos \
  -d '{"content":"this is the todo content"}' \
  -H 'Content-Type: application/json'

# List all the todos
curl localhost:7000/todos

# Get a todo, by id
curl localhost:7000/todos/1

# Update the todo
curl -XPUT localhost:7000/todos/1 \
  -d '{"content":"noo todo content"}' \
  -H 'Content-Type: application/json'

# Delete the todo
curl -XDELETE localhost:7000/todos/1

```

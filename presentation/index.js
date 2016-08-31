// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  Code,
  CodePane,
  Deck,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import custom component
import Interactive from "../assets/interactive";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  dependency: require("../assets/dependency-graph.gif"),
  dontCare: require("../assets/dont-even-care.jpg"),
  city: require("../assets/city.jpg"),
  kat: require("../assets/kat.png"),
  logo: require("../assets/formidable-logo.svg"),
  markdown: require("../assets/markdown.png"),
  haus: require("../assets/logo_haus.svg")
};

preloader(images);

const theme = createTheme({
  primary: "#F0F0F0",
  quartenary: "#EBC71E"
});

function InlineQuote({ children }) {
  return (
    <Quote textSize="1em" margin="0.5em auto" italic textColor="black">"{children}"</Quote>
  );
}

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>
          <Slide transition={["zoom"]} bgColor="primary">
            <Heading size={1} fit textColor="black">
              Dependency Injection in Node 💉
            </Heading>
            <Text margin="0.5em auto 0.2em" bold caps textColor="#00AFAA">Emil Ong</Text>
            <Text textSize="1em" margin="20px 0px 0px" bold>Head of Engineering</Text>
            <Image src={images.haus} margin="0 auto 0 -0.5em" height="0.8em"/>

            <Layout>
              <Text margin="1em auto" textSize="1em"><Link target="_blank" href="https://twitter.com/OngEmil">@OngEmil</Link></Text>
              <Text margin="1em auto" textSize="1em"><Link target="_blank" href="https://engineering.haus.com">engineering.haus.com</Link></Text>
              <Text margin="1em auto" textSize="1em"><Link target="_blank" href="https://twitter.com/haushq">@haushq</Link></Text>
            </Layout>
          </Slide>
          <Slide>
            <Heading size={1} fit textColor="black">Background & Motivation</Heading>
            <List>
              <ListItem>Came to Node from Ruby, Java experience</ListItem>
              <ListItem>Just getting started, decided on a monolith</ListItem>
              <ListItem>REST backend in Node using Express</ListItem>
              <ListItem>Not a huge app, but non-trivial and definitely not a microservice</ListItem>
              <ListItem>Code sharing for both HTTP endpoints and background tasks</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={1} fit textColor="black">Design considerations</Heading>
            <List>
              <ListItem>Testing, file layout, and how they interact</ListItem>
              <ListItem>Wanted to use patterns such as:
                <List margin="auto 2em">
                  <ListItem>Dependency injection</ListItem>
                  <ListItem>Aspect-orientation</ListItem>
                  <ListItem>Convention-over-configuration</ListItem>
                </List>
              </ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={1} fit textColor="black">What is a dependency?</Heading>
            <List>
              <ListItem>A component that your code needs to operate</ListItem>
              <ListItem>In testing terms, another <b>unit</b>, i.e. mockable</ListItem>
              <ListItem>May behave differently depending on environment</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={1} fit textColor="black">How does your code get dependencies?</Heading>
            <List>
              <ListItem>Functions get arguments</ListItem>
              <ListItem>Projects and modules use package.json</ListItem>
              <ListItem>Individual files use <Code>require()</Code></ListItem>
            </List>
            <Appear><Text>👆 One of these things is not like the others</Text></Appear>
          </Slide>
          <Slide>
            <Heading size={1} fit textColor="black">❗ Imperative vs Declarative ❓</Heading>
            <List>
              <ListItem>Imperative dependencies say, <InlineQuote>I need X and I'll go get it</InlineQuote></ListItem>
              <ListItem>Declarative dependencies say, <InlineQuote>I need X and I don't care where it comes from</InlineQuote></ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={1} fit textColor="black">❗ Imperative vs Declarative ❓</Heading>
            <Layout>
              <List>
                <ListItem>Imperative means the unit decides where its dependencies should come from</ListItem>
                <ListItem>Declarative means something else decides where its dependencies should come from</ListItem>
              </List>
              <Image src={images.dontCare} margin="1em auto"/>
            </Layout>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">So what's up with require()?</Heading>
            <Text margin="0.5em auto">It's half-way between declarative and imperative</Text>
            <List>
              <ListItem>
                For npm modules, it's close to declarative
                <br/>
                <Code textSize="0.8em" margin="auto auto 1em 2em">require('express')</Code>
              </ListItem>
              <ListItem>
                For other files, it's imperative and bound to the FS
                <br/>
                <Code textSize="0.8em" margin="auto auto 1em 2em">require('../../models/todo')</Code>
              </ListItem>
            </List>
          </Slide>
          <Slide
            notes="Can feed the unit its dependencies.<br/>Cleaner interfaces - makes you declare what you need, avoid requires all over the place."
          >
            <Heading size={2} fit textColor="black">Why prefer declarative dependencies?</Heading>
            <List>
              <ListItem>Makes unit testing easier</ListItem>
              <ListItem>Forcing function for cleaner interfaces</ListItem>
              <ListItem>Your file shouldn't have to know where everything else is</ListItem>
            </List>
          </Slide>
          <Slide notes="If you're ok with functional/multi-unit tests, not a problem.">
            <Heading size={2} fit textColor="black">When is imperative not ok?</Heading>
            <List>
              <ListItem>You need to mock something</ListItem>
              <ListItem>Project complexity reaches a certain (subjective) size</ListItem>
            </List>
            <Text>The FS as an imperative mechanism is particularly painful</Text>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">How can you use declarative dependencies in Node?</Heading>
            <List>
              <ListItem>Break everything down into NPM modules</ListItem>
              <ListItem>Hack require() (NODE_PATH, proxyquire, etc.)</ListItem>
              <ListItem>Use a Dependency Injection Container</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Dependency Injection Containers</Heading>
            <Layout>
            <List>
              <ListItem>Keep a registry of who needs what and who provides what</ListItem>
              <ListItem>Factories can create a component, given its dependencies</ListItem>
              <ListItem>Dependencies are injected on factory invocation</ListItem>
            </List>
            <Image src={images.dependency} margin="auto 1em" width={400} height={300}/>
            </Layout>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Example DI container: bottlejs</Heading>
            <List>
              <ListItem>Inspired by Angular's DI container</ListItem>
              <ListItem>Node and browser compatible</ListItem>
              <ListItem>Actively maintained and stable</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Declaring dependencies in bottlejs</Heading>
            <CodePane
              lang="js"
              source={require("raw!../example/slides/simple-decl.js")}
              margin="20px auto"
            />
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Using dependencies in bottlejs</Heading>
            <CodePane
              lang="js"
              source={require("raw!../example/slides/simple-usage.js")}
              margin="20px auto"
            />
          </Slide>
          <Slide notes="not required for every service, buy you have this option">
            <Heading size={2} fit textColor="black">Multiple factories for the same dependency</Heading>
            <Layout>
              <CodePane
                style={{minWidth:'50%'}}
                lang="js"
                source={require("raw!../example/slides/simple-choice-1.js")}
                margin="20px 20px 20px -10px"
              />
              <CodePane
                style={{minWidth:'50%'}}
                lang="js"
                source={require("raw!../example/slides/simple-choice-2.js")}
                margin="20px auto"
              />
            </Layout>
            <Appear><Text bold>Our RoboTexter code requires no changes!</Text></Appear>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">What about bigger applications?</Heading>
            <Appear><Text margin='0.5em auto'>Let's look at an MVC example with a CRUD service for Todos</Text></Appear>
          </Slide>
          <Slide notes="it's all well and good when the bottle instance is in a single file, but">
            <Heading size={2} fit textColor="black">How do we register our components?</Heading>
            <Text margin='0.5em auto'>Export a function that takes a bottle:</Text>
            <CodePane
              lang="js"
              source={require("raw!../example/slides/simplified-todo-model.js")}
              margin="20px auto"
            />
          </Slide>
          <Slide>
            <Heading size={1} fit textColor="black">Filling the bottle</Heading>
            <CodePane
              lang="js"
              source={require("raw!../example/index.js")}
              margin="20px auto"
            />
          </Slide>
          <Slide>
            <Heading size={1} fit textColor="black">What can you do with a full bottle?</Heading>
            <List>
              <ListItem>Access and instantiate any declared dependency, with <i>its</i> dependencies</ListItem>
              <ListItem>Override dependencies as needed for testing</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Using the DI container in tests</Heading>
            <Layout style={{ marginLeft: '-2em'}}>
              <CodePane
                style={{minWidth:'60%'}}
                lang="js"
                source={require("raw!../example/tests/app/controllers/todos.unit.test.js").split('\n').slice(2).join('\n')}
                margin="20px 20px 20px auto"
              />
              <CodePane
                style={{minWidth:'45%'}}
                lang="js"
                source={require("raw!../example/slides/controllers-example.js")}
                margin="20px auto"
              />
            </Layout>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Benefits of unit testing this way</Heading>
            <List>
              <ListItem>We know the dependencies of our unit under test</ListItem>
              <ListItem>Can interpose on those dependencies for interaction tests</ListItem>
              <ListItem>Can ignore where the unit lives on the filesystem</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Same container, but with functional tests!</Heading>
            <CodePane
              lang="js"
              source={require("raw!../example/tests/app/controllers/todos.func.test.js").split('\n').slice(2).join('\n')}
              margin="20px auto"
            />
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">require() vs bottle lookup</Heading>
            <CodePane
              lang="js"
              source={require("raw!../example/slides/require-vs-bottle.js")}
              margin="20px auto"
            />
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Unit & Functional with the same container</Heading>
            <List>
              <ListItem>Unit tests to isolate logic errors</ListItem>
              <ListItem>Functional tests to validate setup and interface matching</ListItem>
              <ListItem>Same container means we're testing the real code in both cases</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={1} fit textColor="black">Service discovery</Heading>
            <List>
              <ListItem>If we use appropriate naming conventions, we can find all components of a type</ListItem>
              <ListItem>At runtime, we can enumerate them in the container for cool tricks like plugins</ListItem>
              <ListItem>Can use as a way of implementing Convention over Configuration (CoC)</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Example: Routes in Express</Heading>
            <Layout style={{ marginLeft: '-2em'}}>
              <CodePane
                style={{minWidth:'60%'}}
                lang="js"
                source={require("raw!../example/slides/simplified-server.js")}
                margin="20px 20px 20px auto"
              />
              <CodePane
                style={{minWidth:'45%'}}
                lang="js"
                source={require("raw!../example/app/routes/todos.js")}
                margin="20px auto"
              />
            </Layout>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Other DI Container tricks</Heading>
            <List>
              <ListItem>Plugins</ListItem>
              <ListItem>Code reuse, e.g. controllers vs background tasks for the same business logic</ListItem>
              <ListItem>Aspect-oriented enhancement (bottle decorators)</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Why not DI containers? 👿</Heading>
            <List>
              <ListItem>Probably overkill for very small apps or microservices</ListItem>
              <ListItem>Not used widely in JS/Node, so might be a learning curve</ListItem>
              <ListItem>Retrofitting existing apps might be tricky</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Conclusion</Heading>
            <List>
              <ListItem>DI containers are a great way to do both injection and service discovery</ListItem>
              <ListItem>Can use as a way of implementing Convention over Configuration (CoC)</ListItem>
              <ListItem>Enables multiple testing methodologies easily</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Thanks! 🙏</Heading>
            <Layout>
              <Text margin="1em auto" textSize="1em"><Link target="_blank" href="https://twitter.com/OngEmil">@OngEmil</Link></Text>
              <Text margin="1em auto" textSize="1em"><Link target="_blank" href="https://engineering.haus.com">engineering.haus.com</Link></Text>
              <Text margin="1em auto" textSize="1em"><Link target="_blank" href="https://twitter.com/haushq">@haushq</Link></Text>
            </Layout>
            <Text margin="1em auto" textSize="1em">(Obvs, we're hiring: <Link target="_blank" href="https://haus.com/jobs">https://haus.com/jobs)</Link></Text>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}

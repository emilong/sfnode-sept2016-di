// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  Code,
  CodePane,
  Deck,
  Fill,
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
            <Text margin="0.5em auto" bold caps textColor="#00AFAA">Emil Ong</Text>
            <Text textSize="1em" margin="20px 0px 0px" bold>Head of Engineering</Text>
            <Image src={images.haus} margin="0 auto 0 -0.5em" height="0.8em"/>
          </Slide>
          <Slide>
            <Heading size={1} fit textColor="black">What is a dependency?</Heading>
            <List>
              <ListItem>A component that your code needs to operate</ListItem>
              <ListItem>In testing terms, another <b>unit</b>, i.e. mockable</ListItem>
              <ListItem>May behave differently depending on environment</ListItem>
            </List>
          </Slide>
          {/* need examples */}
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
            <List>
              <ListItem>Imperative means the unit decides where its dependencies should come from</ListItem>
              <ListItem>Declarative means something else decides where its dependencies should come from</ListItem>
            </List>
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
          <Slide>
            <Heading size={2} fit textColor="black">Why prefer declarative dependencies?</Heading>
            <List>
              <ListItem>Makes unit testing easier</ListItem>
              <ListItem>Forcing function for cleaner interfaces</ListItem>
              <ListItem>Your file shouldn't have to know where everything else is</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">When is the filesystem not ok?</Heading>
            <List>
              <ListItem>You need to mock something</ListItem>
              <ListItem>Project complexity reaches a certain (subjective) size</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">How can you use declarative dependencies in Node?</Heading>
            <List>
              <ListItem>Break everything down into NPM modules</ListItem>
              <ListItem>Hack require() (NODE_PATH, proxyquire, etc.)</ListItem>
              <ListItem>Dependency Injection Container</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Dependency Injection Containers</Heading>
            <List>
              <ListItem>Keep a registry of who needs what and who provides what</ListItem>
              <ListItem>Factories can create a component, given its dependencies</ListItem>
              <ListItem>Dependencies are injected on factory invocation</ListItem>
            </List>
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
              source={require("raw!../example/simple-decl.js")}
              margin="20px auto"
            />
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Using dependencies in bottlejs</Heading>
            <CodePane
              lang="js"
              source={require("raw!../example/simple-usage.js")}
              margin="20px auto"
            />
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Multiple factories for the same dependency</Heading>
            <CodePane
              lang="js"
              source={require("raw!../example/simple-choice-1.js")}
              margin="20px auto"
            />
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Choosing the factory at runtime</Heading>
            <CodePane
              lang="js"
              source={require("raw!../example/simple-choice-2.js")}
              margin="20px auto"
            />
            <Appear><Text bold>Our RoboTexter code requires no changes!</Text></Appear>
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Let's get real</Heading>
            {/* example */}
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Using the DI container in tests</Heading>
            {/* example */}
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Freedom from the filesystem</Heading>
            {/* example, health checkers? */}
          </Slide>
          <Slide>
            <Heading size={2} fit textColor="black">Service discovery</Heading>
            {/* example, health checkers? */}
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}

react-experiments
====================

react-experiments is a Javascript library that assists in defining and managing UI experiments in React.

# Installation

```
npm install react-experiments
```

# Usage

react-experiments was built to work with [PlanOut.js](https://www.github.com/HubSpot/PlanOut.js) and most of the constructs in it are inspired by the structure of PlanOut.js. This library will work out of the box if you pass it an instantiated PlanOut Namespace or Experiment class, but if you want to use your own methods of assigning experiment parameters and logging exposure then you can extend the base [experiment class](https://github.com/HubSpot/react-experiments/blob/master/src/experimentClass.js) and pass that as the experiment prop to the Experiment class components.

## Philosophy

This library makes the assumption that there are two types of experiment parameters: 

1) Parameters that correspond to parametrizations of existing variables and components. For instance, if one is running an experiment to test which shade of blue optimizes the click rate of the button then the the values that your experiment parameters map to would correspond something such as the different hex codes for the different shades of blue.

2) "Branching" parameters where the parameter values correspond to different "variations" of the experiment. For instance, if one is testing two completely different user interfaces then one could define the experiment as follows:

```
ui = uniformChoice(choices=['control', 'new']);
```

and the application logic to implement this experiment would effectively be an if statement around the two UIs.

Building off this, this library provides two ways to implement UI experiments. Both methods use the Experiment component:

### Parametrizations

The Experiment component by default passes down experiment parameters to its immediate children as props under ```experimentParameters``` and to all its descendants using context. Likewise, any props passed into 

This plays very nicely with the first type of experimental parameters specified above. Here is an example of this:

```javascript
  var FooComponent = React.createClass({
      contextTypes: {
        experimentParameters: React.PropTypes.object.isRequired
      },

      render: function() {
        return (
          <span>
            This is passed down by context:
            {this.context.experimentParameters.foo}
          </span>
        );
      }
    });

  var TextComponent = React.createClass({ 
    render: function() {
      return (
        <span>
          This is passed down by props: {this.props.experimentParameters.foo}
          <br />
          <FooComponent />
        </span>
      );
    }
  });
    
  var ParametrizeExperiment = React.createClass({
    render: function() {
      return (
        <ReactExperiments.Parametrize experiment={window.demo}>
          <TextComponent />
        </ReactExperiments.Parametrize>
      );
    }
  });
```

### Variations

The Variation and Default components are available for implementing experiments involving "branching" experiment parameters.

Here is a simple A/B test implemented using the Experiment component and "branching" experiment parameters:

```javascript
import {TestNamespace} from [file where you define your namespace];
import {Experiment, Variation} from 'ReactExperiments';

...

<Experiment experiment={TestNamespace} param='show_text'>
  <Variation name="experimental">    
    Example A  
  </Variation>   
  <Variation name='control'>   
    Example B  
  </Variation>   
</Experiment>
```

The name passed into Variation as a prop should be the experimental value that the parameter will resolve to. For example, in this case Example A will be rendered if the 'show_text' param maps to the value "experimental" and Example B will be rendered if the 'show_text param maps to the value "control".

There are two cases where an experiment component will render nothing:

1) If, in the example above, the 'show_text' param mapped to the value 'foobar' then the Experiment component will render nothing. 

2) If you want to have conditional enrollment in an experiment then you can pass down an shouldEnroll prop to the Experiment component. If the user is not enrolled in the experiment then nothing will render.

#### Nested Variations

It is also possible to implement "nested" variations by passing a specific parameter name as a prop to the Variation component instead of the Experiment component.

```
<Experiment experiment={TestNamespace}>
  <Variation param="show_text" name="experimental">
    a
    <Variation param="show_sign" name="show">
      show_sign
    </Variation>
    <Variation param="show_sign" name="hide">
      hide_sign
    </Variation>
  </Variation>
  <Variation param="show_text" name="control">
    b
    <Variation param="show_sign" name="show">
      show_sign
    </Variation>
    <Variation param="show_sign" name="hide">
      hide_sign
    </Variation>
  </Variation>
</Experiment>
```

### Default Component

The Default component will render in the case that the experiment param does not map to any of the Variation components. Note that this will not work with nested variation components.

Here are two examples using the Experiment component. Suppose that for user X, the parameter foo maps to the value bar.

Example A:
```javascript
<Experiment experiment={TestNamespace} param='foo'>
  <Variation name='foo'>
    foo
  </Variation>
  <Default>
    foobar
  </Default>
</Experiment>
```
Example B:
```javascript
<Experiment experiment={TestNamespace}>
  <Variation name='foo'>
    foo
  </Variation>
  <Variation name='bar'>
    bar
  </Variation>
  <Variation name='test'>
    test
  </Variation>
  <Default>
    foobar
  </Default>
</Experiment>
```

For user X in the example A, the Default component renders since for user X foo maps to bar and there is no variation component defined for bar and therefore foobar will render.
In Example B, there is a variation component defined for bar and in this case bar will render.

## Customized Experiment Components

If you want to create your own experiment component you can extend the base Parametrize component which is a fairly generic component that parametrizes its descendants with the experiment parameters of the experiment class passed in.

## Logging

react-experiments logs an exposure event when it determines that a user should be enrolled in an experiment (i.e. the shouldEnroll prop is not false). 

## Development

This project is written using ES6 and all build steps / transpilation are done by webpack. Be sure to run ```npm install``` to install the necessary development dependencies. In order to develop and test locally, it is necessary to simply run the ```build.sh``` shell script which will take care of transpiling to ES5 and running tests.

To test API changes locally, open the examples/index.html file locally after building with your most recent changes. The index.html file contains a simple example of using this library paired with the [PlanOut.js sample experiment](https://github.com/HubSpot/PlanOut.js/blob/master/examples/sample_planout_es5.js).

Please be sure to add tests to this project when making changes. This project uses [Jest](https://facebook.github.io/jest/) for running tests. Tests can be run either by building the project using build.sh or by using ```npm test```.


react-experiments
====================

react-experiments is a Javascript library that assists in defining and managing UI experiments in React.

# Installation

```
npm install react-experiments
```

# Usage

react-experiments was built to work with [PlanOut.js](https://www.github.com/HubSpot/PlanOut.js) and most of the constructs in it are inspired by the structure of PlanOut.js. This library will work out of the box if you pass it a PlanOut Namespace or Experiment class, but if you want to use your own (potentially more lightweight) methods of assigning experiment parameters and logging exposure then you can extend the base [ExperimentClass](https://github.com/HubSpot/react-experiments/blob/master/src/experimentClass.js) and pass that as the experimentClass prop to the Experiment class components.

## Using the Experiment Component

Here is a basic A/B test defined using react-experiments:

```javascript
import {TestNamespace} from [file where you define your namespace];
import {Experiment, Variation} from 'ReactExperiments';

...

<Experiment experimentClass={TestNamespace} param='show_text'>
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

2) If you want to have conditional enrollment in an experiment then you can pass down an isEnrolled prop to the Experiment component. If the user is not enrolled in the experiment then nothing will render.

## Namespace Usage

In the case that you need define more than 1 experiment in the same component and want to ensure that any given user only views at most one experiment, then you can wrap your experiment components inside of a ```Namespace``` components as such:

```javascript
import {TestNamespace} from [file where you define your namespace];
import {Namespace, Experiment, Variation} from 'ReactExperiments';

...

<Namespace experimentClass={TestNamespace}>
  <Experiment param='foo'>
    <Variation name="experimental">    
     [some html]   
    </Variation>   
    <Variation name='control'>   
      [some html]   
    </Variation>   
  </Experiment>
  <Experiment param='bar'>
    <Variation name="experimental">    
     [some html]   
    </Variation>   
    <Variation name='control'>   
      [some html]   
    </Variation>   
  </Experiment>
</Namespace>
```

## Default Component

The Default component will render in the case that the experiment param does not map to any of the Variation components. The Default component can be used in both an Experiment component and a Namespace component.

Here are two examples using the Experiment component. Suppose that for user X, the parameter foo maps to the value bar.

Example A:
```javascript
<Experiment experimentClass={TestNamespace} param='foo'>
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
<Experiment experimentClass={TestNamespace}>
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

The same general pattern also holds for Namespace components, except Default components will only be respected when they are not in an Experiment component.

For instance, in this example the Default component will not be rendered.
```javascript
<Namespace experimentClass={TestNamespace} param='foo'>
  <Experiment param='foo'>
    <Variation name='foo'>
      test
    </Variation>
    <Default>
      default
    </Default>
  </Experiment>
</Namespace>
```

However, in this example the Default component will be rendered.
```javascript
<Namespace experimentClass={TestNamespace} param='foo'>
  <Experiment param='foo'>
    <Variation name='foo'>
      test
    </Variation>
  </Experiment>
  <Default>
    default
  </Default>
</Namespace>
```

## Logging

react-experiments logs an exposure event when it renders a Variation component. Since it only logs exposure when the component actually renders, not when the experiment value is assigned, you can implement the same Experiment component across multiple different React components and be certain that logExposure only gets invoked when the variation the user is enrolled in actually is shown to the user.

Suppose you have two pages - /start and /welcome. If you have an experiment that is defined as follows:

```javascript
sampleParam = uniformChoice(choices=['a', 'b'], unit=userid)
```

Suppose you define the following Experiment component on the /start page:
```javascript
<Experiment experimentClass={foo} param='sampleParam'>
  <Variation name='a'>
    test a
  </Variation>
</Experiment>
```

and the following Experiment component on the /welcome page:
```javascript
<Experiment experimentClass={foo} param='sampleParam'>
  <Variation name='b'>
    test b
  </Variation>
</Experiment>
```

then exposure will only be logged if the user is enrolled in the 'a' variation and is viewing the /start page or the user is enrolled in the 'b' variation and is viewing the /welcome page.

It is important to note as well that if a user is binned into the Default component then exposure is NOT logged.

## Development

This project is written using ES6 and all build steps / transpilation are done by webpack. In order to develop and test locally, it is necessary to simply run the ```build.sh``` shell script which will take care of transpiling to ES5.

If you have not already, you may need to install babel and webpack:

```
npm install babel-core
npm install babel
npm install webpack
```

To test API changes locally, open the examples/index.html file locally after building with your most recent changes. The index.html file contains a simple example of using this library paired with the [PlanOut.js sample experiment](https://github.com/HubSpot/PlanOut.js/blob/master/examples/sample_planout_es5.js).

As this project is still rather young and the primary interface is still in a bit of flux, there have not been any tests written for this. However, the infrastructure for adding tests is currently set up using [Jasmine-ES6](https://www.npmjs.com/package/jasmine-es6). If you wish to add a test simply add a spec file or add tests to the existing spec files. Tests can be run using ```npm test```.


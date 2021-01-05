export default function commonReport({ on }) {
  // TODO
  on('page', 'afterRender', console.log.bind(console, 'After page render...'));

  on('component', 'afterRender', console.log.bind(console, 'After component render...'));
  on('component', 'click', console.log.bind(console, 'Click component...'));
  on('component', 'mouseEnter', console.log.bind(console, 'mouseEnter..'));
  on('component', 'mouseLeave', console.log.bind(console, 'mouseLeave...'));
  on('component', 'doubleClick', console.log.bind(console, 'doubleClick...'));
  on('component', 'longPress', console.log.bind(console, 'longPress...'));
  on('component', 'enterView', console.log.bind(console, 'Enter view...'));
  on('component', 'leaveView', console.log.bind(console, 'Leave view...'));

  on('hotarea', 'afterRender', console.log.bind(console, 'hotarea After render...'));
  on('hotarea', 'click', console.log.bind(console, 'hotarea Click...'));
  on('hotarea', 'mouseEnter', console.log.bind(console, 'hotarea mouseEnter..'));
  on('hotarea', 'mouseLeave', console.log.bind(console, 'hotarea mouseLeave...'));
  on('hotarea', 'doubleClick', console.log.bind(console, 'hotarea doubleClick...'));
  on('hotarea', 'longPress', console.log.bind(console, 'hotarea longPress...'));
  on('hotarea', 'enterView', console.log.bind(console, 'hotarea Enter view...'));
  on('hotarea', 'leaveView', console.log.bind(console, 'hotarea Leave view...'));
}

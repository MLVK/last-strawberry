import Ember from 'ember';
import config from 'last-strawberry/config/environment';

export default Ember.Component.extend({
  quotes: Ember.inject.service(),
  classNames: ['row', "spaceBetween", "center"],
  tagName: 'Footer',
  gitVersion: config.currentRevision
});

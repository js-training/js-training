/**
 * Created with JetBrains WebStorm.
 * User: K.Guselshchykova
 * Date: 4/8/13
 * Time: 3:20 PM
 * To change this template use File | Settings | File Templates.
 */
function Dictionary(startValues) {
    this.values = startValues || {};
}

Dictionary.prototype.store = function(name, value) {
    this.values[name] = value;
};
Dictionary.prototype.lookup = function(name) {
    return this.values[name];
};
Dictionary.prototype.contains = function(name) {
    return Object.prototype.hasOwnProperty.call(this.values, name) &&
        Object.prototype.propertyIsEnumerable.call(this.values, name);
};
Dictionary.prototype.each = function(action) {
    forEachIn(this.values, action);
};
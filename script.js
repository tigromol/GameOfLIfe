'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function randStart(size, rand) {
    //Function which set random starting state
    var matrix = new Array(size).fill(0).map(function () {
        return new Array(size).fill(0);
    });
    return matrix.map(function (x) {
        return x.map(function () {
            return Math.random() < rand ? 1 : 0;
        });
    });
}

function stateUpdate(mat) {
    //**TODO pseudo infinite field */
    var currentState = mat.map(function (x) {
        return x.slice();
    });
    var nextState = mat.map(function (x) {
        return x.slice();
    });
    for (var i = 0; i < currentState.length; i++) {
        for (var j = 0; j < currentState[i].length; j++) {
            if (i == 0 & j == 0) {
                //top left corner
                var _summ = currentState[i + 1][j] + currentState[i][j + 1] + currentState[i + 1][j + 1];
                _summ == 3 & currentState[i][j] == 0 ? nextState[i][j] = 1 : 0;
                (_summ > 3 | _summ < 2) & currentState[i][j] == 1 ? nextState[i][j] = 0 : 1;
            }
            if (i == 0 & (j != 0 | j != currentState[i].length - 1)) {
                //top border
                var summ = 0;
                for (var _k = 0; _k < 2; _k++) {
                    for (var _k2 = -1; _k2 < 2; _k2 = _k2 + (2 - _k * 1)) {
                        summ += currentState[i + _k][j + _k2];
                    }
                }
                summ > 3 | summ < 2 ? nextState[i][j] = 0 : 1;
                currentState[i][j] == 0 & summ == 3 ? nextState[i][j] = 1 : 0;
            }
            if (i == currentState[i].length - 1 & (j != 0 | j != currentState[i].length - 1)) {
                //bottom border
                var summ = 0;
                for (var _k3 = 0; _k3 < 2; _k3++) {
                    for (var _k4 = -1; _k4 < 2; _k4 = _k4 + (2 - _k3 * 1)) {
                        summ += currentState[i - _k3][j + _k4];
                    }
                }
                summ > 3 | summ < 2 ? nextState[i][j] = 0 : 1;
                currentState[i][j] == 0 & summ == 3 ? nextState[i][j] = 1 : 0;
            }
            if (j == 0 & (i != 0 & i != currentState[i].length - 1)) {
                // left border
                var summ = 0;
                for (var _k5 = 0; _k5 < 2; _k5++) {
                    for (var _k6 = -1; _k6 < 2; _k6 = _k6 + (2 - _k5 * 1)) {
                        summ += currentState[i + _k6][j + _k5];
                    }
                }
                summ > 3 | summ < 2 ? nextState[i][j] = 0 : 1;
                currentState[i][j] == 0 & summ == 3 ? nextState[i][j] = 1 : 0;
            }
            if (j == currentState[i].length - 1 & (i != 0 & i != currentState[i].length - 1)) {
                // right border
                var summ = 0;
                for (var _k7 = 0; _k7 < 2; _k7++) {
                    for (var _k8 = -1; _k8 < 2; _k8 = _k8 + (2 - _k7 * 1)) {
                        summ += currentState[i + _k8][j - _k7];
                    }
                }
                summ > 3 | summ < 2 ? nextState[i][j] = 0 : 1;
                currentState[i][j] == 0 & summ == 3 ? nextState[i][j] = 1 : 0;
            }
            if (j == 0 & i == currentState[i].length - 1) {
                //top right coner
                var _summ2 = currentState[i - 1][j] + currentState[i][j + 1] + currentState[i - 1][j + 1];
                _summ2 == 3 & currentState[i][j] == 0 ? nextState[i][j] = 1 : 0;
                (_summ2 > 3 | _summ2 < 2) & currentState[i][j] == 1 ? nextState[i][j] = 0 : 1;
            }
            if (i == 0 & j == currentState[i].length - 1) {
                //bottom right coner
                var summ1 = currentState[i + 1][j] + currentState[i][j - 1] + currentState[i + 1][j - 1];
                summ1 == 3 & currentState[i][j] == 0 ? nextState[i][j] = 1 : 0;
                (summ1 > 3 | summ1 < 2) & currentState[i][j] == 1 ? nextState[i][j] = 0 : 1;
            }
            if (i == currentState[i].length - 1 & j == currentState[i].length - 1) {
                //bottom left corner
                var _summ3 = currentState[i - 1][j] + currentState[i][j - 1] + currentState[i - 1][j - 1];
                _summ3 == 3 & currentState[i][j] == 0 ? nextState[i][j] = 1 : 0;
                (_summ3 > 3 | _summ3 < 2) & currentState[i][j] == 1 ? nextState[i][j] = 0 : 1;
            }
            if (i != 0 & i != currentState[i].length - 1 & (j != 0 & j != currentState[i].length - 1)) {
                //everything else
                var summ1 = 0;
                for (var k = -1; k < 2; k++) {
                    for (var k1 = -1; k1 < 2; k1 = k1 + (2 - Math.pow(k, 2) * 1)) {
                        summ1 += currentState[i + k][j + k1];
                    }
                }
                summ1 == 3 & currentState[i][j] == 0 ? nextState[i][j] = 1 : 0;
                (summ1 > 3 | summ1 < 2) & currentState[i][j] == 1 ? nextState[i][j] = 0 : 1;
            }
        }
    }
    return nextState;
}

var Field = function (_React$Component) {
    _inherits(Field, _React$Component);

    function Field(props) {
        _classCallCheck(this, Field);

        var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props));

        _this.state = {
            field: randStart(_this.props.size, _this.props.rand),
            history: [],
            cellsAlive: 0,
            active: false,
            period: 0,
            rand: 0.1,
            gen: 0

        };return _this;
    }

    _createClass(Field, [{
        key: 'historyWrite',
        value: function historyWrite() {
            var tmp = this.state.field.slice().map(function (x) {
                return x.join();
            }).join();
            this.setState({ cellsAlive: tmp.split(',').filter(function (x) {
                    return x != '0';
                }).join().length });
            if (this.state.history.length < 10) {

                this.setState({ history: [].concat(_toConsumableArray(this.state.history), [tmp]) });
            }
            if (this.state.history.length == 10) {

                this.setState(function (prevState) {
                    return { history: [].concat(_toConsumableArray(prevState.history.filter(function (_, i) {
                            return i !== 0;
                        })), [tmp]) };
                });
            }
        }
    }, {
        key: 'renderCell',
        value: function renderCell(props) {
            if (props.value == 1) {
                return React.createElement('td', { className: 'cell', id: 'alive', key: props.skey });
            } else {
                return React.createElement('td', { className: 'cell', id: 'dead', key: props.skey });
            }
        }
    }, {
        key: 'randomize',
        value: function randomize() {

            this.setState({ gen: 0, history: [], field: randStart(this.props.size, this.state.rand) });
        }
    }, {
        key: 'finish',
        value: function finish() {
            if (this.state.period != 0) {
                return this.state.period == 1 ? React.createElement(
                    'div',
                    { id: 'finish' },
                    'There is stable configuration'
                ) : React.createElement(
                    'div',
                    { id: 'finish' },
                    'There is periodic configuration with period = ',
                    this.state.period
                );
            }
        }
    }, {
        key: 'nextGen',
        value: function nextGen() {
            this.setState({ field: stateUpdate(this.state.field), gen: this.state.gen + 1 });
            this.isFinished();
            this.historyWrite();
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.setState({ life: false });
            clearInterval(this.timerID);
        }
    }, {
        key: 'life',
        value: function life() {
            var _this2 = this;

            this.setState({ life: true, period: 0 });
            this.timerID = setInterval(function () {
                return _this2.nextGen();
            }, 1000);
        }
    }, {
        key: 'lifeHandler',
        value: function lifeHandler() {
            if (this.state.life) {
                return React.createElement(
                    'button',
                    { className: 'control', onClick: this.stop.bind(this) },
                    'Stop'
                );
            }
            if (!this.state.life) {
                return React.createElement(
                    'button',
                    { className: 'control', id: 'start', onClick: this.life.bind(this) },
                    'Start'
                );
            }
        }
    }, {
        key: 'isFinished',
        value: function isFinished() {
            var currentValue = this.state.field.slice().map(function (x) {
                return x.join();
            }).join();
            for (var i = 0; i < this.state.history.length; i++) {
                var prevValue = this.state.history[i];
                if (currentValue == prevValue) {

                    this.setState({ period: this.state.history.length - i });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var rows = [];
            var squares = [];
            var k = 0;
            for (var r = 0; r < this.state.field.length; r++) {
                for (var i = 0; i < this.state.field[r].length; i++) {
                    squares.push(React.createElement(this.renderCell, { value: this.state.field[r][i], key: k++ }));
                }
                rows.push(React.createElement(
                    'tr',
                    { key: k++, className: 'row' },
                    squares
                ));
                squares = [];
            }
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'table',
                    null,
                    React.createElement(
                        'tbody',
                        null,
                        rows
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'controlpanel' },
                    React.createElement(
                        'div',
                        null,
                        this.lifeHandler()
                    ),
                    React.createElement(
                        'button',
                        { className: 'control', onClick: this.randomize.bind(this) },
                        'Randomize'
                    ),
                    React.createElement('input', { className: 'control', id: 'rand', type: 'number', min: '0', max: '100', name: 'randomness', defaultValue: '10', onChange: function onChange() {
                            return _this3.setState({ rand: document.getElementById('rand').value / 100 });
                        } })
                ),
                React.createElement(
                    'div',
                    { id: 'info' },
                    React.createElement(
                        'div',
                        { className: 'info' },
                        'Current generation: ',
                        this.state.gen
                    ),
                    React.createElement(
                        'div',
                        { className: 'info' },
                        'Cells alive: ',
                        this.state.cellsAlive
                    ),
                    React.createElement(
                        'div',
                        { className: 'info' },
                        this.finish()
                    )
                )
            );
        }
    }]);

    return Field;
}(React.Component);

var domContainer = document.getElementById('1');
ReactDOM.render(React.createElement(Field, { size: 50 }), domContainer);
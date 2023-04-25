import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';

export class OutputModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: OutputModel.model_name,
      _model_module: OutputModel.model_module,
      _model_module_version: OutputModel.model_module_version,
      _view_name: OutputModel.view_name,
      _view_module: OutputModel.view_module,
      _view_module_version: OutputModel.view_module_version,
      value: 'Hello World',
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'OutputModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'OutputView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}

export class OutputView extends DOMWidgetView {
  render() {
    this._emailInput = document.createElement('input');
    this._emailInput.type = 'email';
    this._emailInput.value = this.model.get('value');
    this._emailInput.disabled = this.model.get('disabled');

    this.el.appendChild(this._emailInput);

    // Python -> JavaScript update
    this.model.on('change:value', this._onValueChanged, this);
    this.model.on('change:disabled', this._onDisabledChanged, this);

    // JavaScript -> Python update
    this._emailInput.onchange = this._onInputChanged.bind(this);
  }

  private _onValueChanged() {
    this._emailInput.value = this.model.get('value');
  }

  private _onDisabledChanged() {
    this._emailInput.disabled = this.model.get('disabled');
  }

  private _onInputChanged() {
    this.model.set('value', this._emailInput.value);
    this.model.save_changes();
  }

  private _emailInput: HTMLInputElement;
}

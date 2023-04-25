from ipywidgets import DOMWidget, ValueWidget, register
from traitlets import Unicode, Bool, validate, TraitError

from ._frontend import module_name, module_version


@register
class Output(DOMWidget, ValueWidget):
    _model_name = Unicode('OutputModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)

    _view_name = Unicode('OutputView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    value = Unicode('example@example.com').tag(sync=True)
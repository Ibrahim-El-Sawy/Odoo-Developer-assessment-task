# -*- coding: utf-8 -*-
import logging
from odoo import models, api

_logger = logging.getLogger(__name__)

class PosSession(models.Model):
    _inherit = 'pos.session'

    def _pos_ui_models_to_load(self):
        result = super()._pos_ui_models_to_load()
        if 'pos.order.tag' not in result:
            result.append('pos.order.tag')
        return result

    def _loader_params_pos_order_tag(self):
        return {
            'search_params': {
                'fields': ['name', 'color'],
            },
        }

    def _get_pos_ui_pos_order_tag(self, params):
        return self.env['pos.order.tag'].search_read(**params['search_params'])

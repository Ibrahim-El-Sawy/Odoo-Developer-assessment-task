from odoo import models, fields

class PosOrderTag(models.Model):
    _name = 'pos.order.tag'
    _description = 'POS Order Tags'

    name = fields.Char(string='Tag Name', required=True)
    color = fields.Integer(string='Color Index')
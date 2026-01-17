{
    'name': 'POS Order Tags V17',
    'version': '17.0.0.0',
    'depends':  ['point_of_sale', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/order_tag_views.xml', 
    ],
   'assets':{
    'point_of_sale._assets_pos': [
            'pos_order_tag_v17/static/src/css/pos.css',
            'pos_order_tag_v17/static/src/js/TagButton.js',
            'pos_order_tag_v17/static/src/xml/pos_templates.xml',
            ]    
   },
    'installable': True,
    'application': False,
}
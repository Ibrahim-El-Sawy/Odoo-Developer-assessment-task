# Odoo-Developer-assessment-task


------------- Overview --------------

This module extends Odoo Point of Sale (POS) by adding Order Tags functionality.
It allows cashiers to assign one or more tags to each POS order, which are then stored in the backend for tracking and reporting purposes.


---------- Features -----------

Create and manage Order Tags from backend
(Point of Sale → Configurations → Order Tags)

Add Order Tags button in POS Product Screen

Custom popup to select multiple tags per order

Store selected tags on POS Order in backend

JSON REST API to create Order Tags

Built directly for Odoo v17

---------- Technical Implementation -----------

New model: pos.order.tag (name, color)

POS Order extended with Many2many relation to tags

POS session extended to load tags into POS UI

POS frontend extended using OWL & JS patches

REST endpoint:

POST /api/pos/order-tags



 ----------  notes --------------
 Development started directly on Odoo v17
(Odoo v16 version was not implemented)

The Order Tags button and popup are fully implemented in POS UI

Mandatory tag validation before payment was partially implemented and not fully finalized due to time constraints

Core logic and architecture are in place and can be completed

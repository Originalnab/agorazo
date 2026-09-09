# AGORAZO BACKEND PRD

## FastAPI + PostgreSQL Marketplace Architecture

**Product:** Agorazo  
**Backend Framework:** Python FastAPI  
**Primary Database:** PostgreSQL  
**API Style:** REST-first  
**Architecture:** Modular monolith initially, service-ready later  
**Primary Currency:** GHS  
**Primary Market:** Ghana  
**Initial Seller:** Agorazo as Seller #001  
**Future Model:** Multi-dealer automotive marketplace  
**Escrow:** Not included in MVP  
**Payments:** PSP integrations such as Paystack / Hubtel  
**Storage:** S3-compatible object storage  
**Background Processing:** Redis + worker queue

---

# 1. Backend Vision

The Agorazo backend must support the complete lifecycle of an automotive transaction:

Vehicle sourcing

↓

Listing

↓

Quotation

↓

Order

↓

Payment plan

↓

Customer payment

↓

Internal allocation

↓

Supplier / seller / service-provider obligations

↓

Shipment

↓

Tema arrival

↓

Clearing

↓

DVLA

↓

Delivery

↓

Review

The backend should not be built as a basic CRUD application.

It should function as the transaction engine for the entire Agorazo marketplace.

---

# 2. Core Architecture Decision

The recommended initial architecture is a:

# Modular Monolith

using FastAPI.

Do not begin with microservices.

Agorazo does not initially need the operational complexity of:

- 15 separate services
- Kubernetes
- distributed transaction management
- service discovery
- complex message infrastructure

Instead, create clear internal modules that can later be separated if the business reaches sufficient scale.

Example:

```text
FastAPI Application

├── Authentication
├── Users
├── Companies
├── Dealers
├── Suppliers
├── Vehicles
├── Listings
├── Pricing
├── Quotes
├── Orders
├── Payments
├── Ledger
├── Disbursements
├── Refunds
├── Shipments
├── Clearing
├── DVLA
├── Reviews
├── Subscriptions
├── Notifications
├── Documents
├── Disputes
└── Administration
```

Each domain should have:

- routes
- schemas
- models
- repository/data-access layer
- services
- permissions
- events where required
- tests

This provides strong modular boundaries without premature microservices.

---

# 3. Recommended Technology Stack

## Application

Python

FastAPI

Pydantic

SQLAlchemy

Alembic

---

## Database

PostgreSQL

---

## Cache

Redis

Use for:

- caching
- rate limiting
- temporary verification codes
- background job queue
- distributed locks where required

---

## Background Jobs

Celery, Dramatiq, RQ or another production-grade Python queue.

Recommended initial use:

Redis + Celery/Dramatiq.

Jobs include:

- email
- SMS
- WhatsApp notifications
- invoice generation
- payment reconciliation
- webhook processing
- scheduled payment reminders
- subscription renewal tasks
- report generation
- document processing

---

# 4. Object Storage

Do not store vehicle images and PDFs directly inside PostgreSQL.

Use S3-compatible object storage.

Examples:

AWS S3

Cloudflare R2

DigitalOcean Spaces

MinIO during local development

Store only metadata and object keys in PostgreSQL.

---

# 5. PostgreSQL Requirements

PostgreSQL is the system of record.

Use it for:

- users
- companies
- vehicles
- orders
- payments
- pricing
- allocations
- ledger
- shipment records
- clearing
- subscriptions
- reviews
- disputes
- audit logs

Use foreign keys and constraints aggressively.

Financial integrity should not depend entirely on application code.

---

# 6. Database ID Strategy

Use UUID primary keys.

Recommended:

UUIDv7 where supported.

Reasons:

- globally unique
- safe for distributed systems
- sortable by creation time
- avoids predictable sequential IDs
- facilitates future service separation

Example:

```text
id UUID PRIMARY KEY
```

Do not expose internal sequential database IDs publicly.

---

# 7. Human-Readable References

UUID should remain the technical identifier.

Generate separate human-facing references.

Examples:

```text
Order:
AG-ORD-2026-000213

Quote:
AG-QT-2026-000127

Payment:
AG-PAY-2026-001025

Refund:
AG-REF-2026-000018

Vehicle:
AG-CAR-001245
```

These references are easier for:

customers

support

finance

clearing agents

dealers

---

# 8. Multi-Tenant Marketplace Design

The backend must be multi-seller from day one.

Create:

```text
companies
```

A company can have types such as:

```text
AGORAZO
DEALER
SUPPLIER
CLEARING_AGENT
SERVICE_PROVIDER
```

Agorazo itself becomes a company record.

Example:

```text
Company:
Agorazo Ltd

type:
PLATFORM

seller_enabled:
true
```

Its dealer/seller entity becomes:

```text
Seller #001
```

When other dealerships join, they use the same underlying architecture.

Do not hard-code assumptions such as:

```python
seller = agorazo
```

---

# 9. Core User Model

Recommended:

```text
users

id
email
phone
password_hash
status
email_verified_at
phone_verified_at
last_login_at
created_at
updated_at
```

A user may belong to one or several organisations through membership records.

---

# 10. Organisation Membership

Create:

```text
company_memberships

id
user_id
company_id
role_id
status
joined_at
```

This allows one person to be:

Dealer Admin at ABC Motors

and potentially

Customer in their personal capacity

without creating duplicate authentication accounts.

---

# 11. Role-Based Access Control

Do not use simple:

```text
is_admin = true
```

Implement RBAC.

Recommended tables:

```text
roles
permissions
role_permissions
company_memberships
```

Permissions:

```text
vehicles.create
vehicles.publish
vehicles.update
orders.view
orders.manage
payments.view
refunds.request
refunds.approve
disbursements.create
disbursements.approve
seller.verify
pricing.manage
reports.finance
audit.read
```

---

# 12. Authentication

Recommended authentication:

JWT access tokens

+

secure refresh tokens

Access token lifetime should be short.

Refresh tokens should support:

- rotation
- revocation
- session tracking
- device logout

Store refresh-token fingerprints/hashes rather than raw sensitive tokens where appropriate.

---

# 13. Multi-Factor Authentication

Require MFA for:

- Super Admin
- Finance
- Seller Admin
- Supplier Admin
- Clearing Admin

Customer MFA can initially be optional.

---

# 14. Login Methods

MVP:

Email + password

Phone + OTP where appropriate

Future:

Google authentication

Apple authentication

---

# 15. Customer Profile

```text
customer_profiles

id
user_id
first_name
last_name
date_of_birth nullable
phone
alternative_phone
address
city
region
country
profile_photo
created_at
updated_at
```

Avoid collecting unnecessary identity data until required.

---

# 16. Company Entity

```text
companies

id
legal_name
display_name
company_type
registration_number
tax_number
email
phone
website
address
city
region
country
status
verification_status
logo_object_key
created_at
updated_at
```

---

# 17. Dealer Entity

```text
dealers

id
company_id
slug
description
seller_status
verification_level
rating_average
review_count
response_rate
completed_transactions
subscription_status
created_at
updated_at
```

---

# 18. Dealer Branch

```text
dealer_branches

id
dealer_id
name
address
city
region
phone
latitude
longitude
is_primary
status
```

---

# 19. Supplier Entity

```text
suppliers

id
company_id
supplier_code
country
currency
contact_name
contact_phone
contact_email
status
payment_terms
notes
```

Initial supplier:

Agorazo's China partner.

---

# 20. Clearing Agent Entity

```text
clearing_agents

id
company_id
license_reference
status
contact_person
contact_phone
default_fee
notes
```

---

# 21. Service Provider Entity

For:

- DVLA processing
- delivery
- inspections
- insurance partners
- warranty providers

```text
service_providers

id
company_id
service_type
status
```

---

# 22. Vehicle Master Architecture

Separate the physical vehicle from the marketplace listing.

This is very important.

Use:

```text
vehicles
```

for the actual vehicle.

Use:

```text
listings
```

for the marketplace advertisement.

One physical vehicle may have different listing states over time.

---

# 23. Vehicle Make

```text
vehicle_makes

id
name
slug
country
logo
active
```

Examples:

Toyota

BYD

Geely

Chery

BMW

---

# 24. Vehicle Model

```text
vehicle_models

id
make_id
name
slug
body_type
active
```

---

# 25. Vehicle Variant

```text
vehicle_variants

id
model_id
name
engine
battery_capacity
fuel_type
transmission
drivetrain
seats
doors
specification_json
```

---

# 26. Physical Vehicle

```text
vehicles

id
supplier_id nullable
make_id
model_id
variant_id nullable

vin
year
mileage
colour
condition
fuel_type
transmission
engine_capacity
battery_capacity
electric_range
drivetrain

location_type
location_country
location_city

supplier_reference
supplier_price
supplier_currency

tema_cost
tema_cost_currency

availability_status

created_at
updated_at
```

VIN should be unique when available.

---

# 27. Vehicle Location Status

Enum:

```text
GHANA
CHINA
IN_TRANSIT
OTHER
```

---

# 28. Vehicle Availability

Enum:

```text
AVAILABLE
RESERVED
ALLOCATED
SOLD
UNAVAILABLE
ARCHIVED
```

---

# 29. Vehicle Media

```text
vehicle_media

id
vehicle_id
media_type
object_key
sort_order
is_cover
alt_text
created_at
```

Types:

IMAGE

VIDEO

360_IMAGE

---

# 30. Listings

```text
listings

id
vehicle_id
seller_id

title
slug
description

status

customer_price
currency

price_type

published_at
expires_at

featured
featured_until

views_count
saves_count

created_at
updated_at
```

---

# 31. Listing Status

```text
DRAFT
PENDING_REVIEW
PUBLISHED
PAUSED
RESERVED
SOLD
REJECTED
ARCHIVED
```

---

# 32. Vehicle Categories

Create categories:

```text
SEDAN
SUV
PICKUP
HATCHBACK
COUPE
VAN
BUS
COMMERCIAL
LUXURY
EV
HYBRID
```

A vehicle may have primary and secondary classifications.

---

# 33. Pricing Engine

Pricing should be its own backend domain.

Do not calculate final prices only inside frontend JavaScript.

Backend must always be authoritative.

---

# 34. Pricing Rule Model

```text
pricing_rules

id
owner_company_id nullable

rule_type
scope_type
scope_id nullable

calculation_type
value

currency

priority

effective_from
effective_until

active

created_by
created_at
updated_at
```

---

# 35. Pricing Rule Types

Examples:

```text
VEHICLE_MARKUP
CLEARING_MARKUP
DVLA_MARKUP
DELIVERY_MARKUP
PLATFORM_TRANSACTION_FEE
SELLER_FEE
INSPECTION_MARKUP
```

---

# 36. Calculation Types

```text
FIXED
PERCENTAGE
```

Future:

```text
TIERED
FORMULA
```

---

# 37. Vehicle Price Calculation

Example:

```text
supplier_tema_cost
+
vehicle_markup
=
seller_vehicle_price
```

Then optional marketplace fee:

```text
seller_vehicle_price
+
platform_customer_fee
=
display_price
```

---

# 38. Pricing Priority

Recommended evaluation:

1. Vehicle-specific pricing rule
2. Seller + category rule
3. Seller default
4. Platform category rule
5. Platform global default

Backend returns:

```json
{
  "base_cost": 220000,
  "markup": 20000,
  "selling_price": 240000,
  "rule_source": "vehicle_specific"
}
```

---

# 39. Pricing Snapshots

Critical requirement:

When a quote/order is created, do not rely on live pricing rules afterward.

Create a pricing snapshot.

Example:

```text
order_price_components
```

This ensures that changing next week's markup does not alter an existing customer's agreed order.

---

# 40. Price Component Model

```text
price_components

id
order_id nullable
quote_id nullable

component_type

description

base_amount
markup_amount
customer_amount

currency

is_estimate
is_government_charge
is_platform_revenue
is_third_party_payable

recipient_company_id nullable

created_at
```

---

# 41. Price Component Types

Examples:

```text
VEHICLE
SHIPPING
CUSTOMS_DUTY
PORT_CHARGE
CLEARING_AGENT
CLEARING_SERVICE
DVLA_OFFICIAL
DVLA_SERVICE
INSURANCE
DELIVERY
INSPECTION
PLATFORM_FEE
DISCOUNT
OTHER
```

---

# 42. Estimates vs Fixed Prices

Each price component must store:

```text
is_estimate
```

Examples:

Vehicle price:

fixed.

Estimated duty:

estimate.

Agorazo clearing service:

fixed.

Final ICUMS duty:

actual.

---

# 43. Quotes

```text
quotes

id
quote_reference
customer_id
seller_id

status

currency

subtotal
total

valid_from
expires_at

notes

created_by
created_at
updated_at
```

---

# 44. Quote Items

```text
quote_items

id
quote_id
vehicle_id nullable
service_type
description
quantity
unit_price
total
is_estimate
```

---

# 45. Quote Status

```text
DRAFT
SENT
VIEWED
ACCEPTED
EXPIRED
REJECTED
CONVERTED
```

---

# 46. Orders

Orders are central to the entire backend.

```text
orders

id
order_reference

customer_id
seller_id
vehicle_id

quote_id nullable

status
currency

vehicle_total
services_total
grand_total

amount_paid
amount_outstanding

selected_payment_plan_id nullable

created_at
confirmed_at
completed_at
cancelled_at
updated_at
```

---

# 47. Order Status

Recommended enum:

```text
DRAFT
AWAITING_PAYMENT
PARTIALLY_PAID
CONFIRMED
VEHICLE_ALLOCATED
PREPARING_EXPORT
SHIPPED
IN_TRANSIT
ARRIVED_TEMA
CLEARING
CLEARED
REGISTRATION
READY_FOR_DELIVERY
DELIVERED
COMPLETED
CANCELLED
REFUNDED
DISPUTED
```

Do not allow arbitrary frontend status strings.

---

# 48. Order State Machine

Status transitions should be validated.

Example:

```text
AWAITING_PAYMENT
→ PARTIALLY_PAID
→ CONFIRMED
→ VEHICLE_ALLOCATED
```

Do not permit:

```text
DRAFT → DELIVERED
```

unless an administrator uses an explicitly audited override.

---

# 49. Order Services

```text
order_services

id
order_id
service_type
provider_company_id nullable

status

estimated_cost
actual_cost

customer_price
platform_revenue

created_at
updated_at
```

---

# 50. Payment Plan Templates

```text
payment_plan_templates

id
seller_id

name
description
status

created_at
```

---

# 51. Payment Plan Milestones

```text
payment_plan_template_milestones

id
plan_id

sequence_number

name
percentage nullable
fixed_amount nullable

trigger_type
due_offset_days nullable

description
```

---

# 52. Example Payment Plan

```text
Plan:
China Standard 30/40/30

1. Order Confirmation
30%

2. Before Shipment
40%

3. Final Milestone
30%
```

---

# 53. Order Payment Schedule

When the order is created, copy the selected payment plan into an order-specific schedule.

Never rely entirely on the template afterward.

```text
order_payment_milestones

id
order_id

sequence_number
name

amount
amount_paid

status

trigger_type

due_date nullable
eligible_at nullable
paid_at nullable
```

---

# 54. Milestone Status

```text
PENDING
ELIGIBLE
PARTIALLY_PAID
PAID
WAIVED
CANCELLED
```

---

# 55. Payments

```text
payments

id
payment_reference

order_id
customer_id

provider
provider_transaction_id

payment_method

currency

gross_amount
provider_fee
net_amount

status

initiated_at
paid_at
failed_at

raw_metadata_json

created_at
updated_at
```

---

# 56. Payment Status

```text
INITIATED
PENDING
SUCCESS
FAILED
CANCELLED
REFUNDED
PARTIALLY_REFUNDED
```

---

# 57. Payment Provider Abstraction

Create a backend interface:

```python
class PaymentProvider:
    async def initialize_payment(...)
    async def verify_payment(...)
    async def create_recipient(...)
    async def initiate_transfer(...)
    async def initiate_refund(...)
    async def fetch_transaction(...)
    async def verify_webhook(...)
```

Then implement:

```text
PaystackProvider
HubtelProvider
```

This prevents payment logic becoming scattered throughout the application.

---

# 58. PSP Webhooks

Webhook architecture must be:

secure

idempotent

auditable

retriable

Never trust frontend payment success.

Payment success comes from:

verified provider callback/webhook

+

server-side verification where appropriate.

---

# 59. Webhook Events Table

```text
webhook_events

id
provider
event_id
event_type

payload_json

signature_valid
processed
processed_at

processing_error

received_at
```

Unique constraint:

```text
(provider, event_id)
```

prevents duplicate processing.

---

# 60. Idempotency

Critical financial endpoints require idempotency.

Examples:

Create payment

Refund

Transfer

Order creation

Quote acceptance

Use:

```text
Idempotency-Key
```

Store processed keys.

Never allow double settlement because the customer pressed Pay twice.

---

# 61. Financial Ledger

Agorazo must have an immutable transaction ledger.

Do not rely only on:

```text
payments.amount
orders.amount_paid
```

Create a proper ledger.

---

# 62. Ledger Accounts

Conceptual accounts:

Customer Funds Received

Supplier Payable

Seller Payable

Clearing Payable

DVLA Payable

Government Charges Payable

Platform Revenue

PSP Fees

Refund Liability

---

# 63. Ledger Entries

Recommended double-entry approach.

Tables:

```text
ledger_accounts
journal_entries
journal_lines
```

Example payment:

Customer pays GHS 100,000.

Journal:

```text
Debit:
PSP Receivable / Bank       100,000

Credit:
Customer Advance Liability 100,000
```

When supplier obligation becomes recognised:

appropriate accounting entries occur.

Final accounting treatment should be reviewed by a professional accountant, but software should support double-entry structure.

---

# 64. Why Double Entry

It prevents situations where:

payments say GHS 1.2m

orders say GHS 1.1m

seller payouts say GHS 950k

and nobody knows where the remaining amount went.

Every financial movement should balance.

---

# 65. Payment Allocations

Operational allocation table:

```text
payment_allocations

id
payment_id
order_id

allocation_type

recipient_company_id nullable

amount

status

created_at
```

---

# 66. Allocation Types

```text
SUPPLIER
SELLER
PLATFORM_REVENUE
CUSTOMS
CLEARING
DVLA
DELIVERY
INSURANCE
REFUND_RESERVE
OTHER
```

---

# 67. Allocation Status

```text
ALLOCATED
ELIGIBLE
DISBURSED
CANCELLED
ADJUSTED
```

Allocation does not equal payout.

---

# 68. Disbursements

```text
disbursements

id
disbursement_reference

order_id
recipient_company_id

recipient_type

payment_provider nullable

destination_type
destination_reference_encrypted

currency
amount

status

approved_by nullable
approved_at nullable

provider_transfer_id nullable

created_at
processed_at
```

---

# 69. Disbursement Destination

Types:

```text
BANK_ACCOUNT
MOBILE_MONEY
INTERNATIONAL_BANK
MANUAL_OFFICIAL_PAYMENT
```

---

# 70. Supplier Payments

International Chinese supplier payments should initially be represented in the system but processed through the company's bank.

Workflow:

```text
Supplier payable
→ payment request
→ finance approval
→ bank payment
→ reference uploaded
→ supplier payment completed
```

---

# 71. Supplier Payment Records

```text
supplier_payments

id
supplier_id
order_id

amount
currency

bank_reference
payment_date

supporting_document_id

status

created_by
approved_by
```

---

# 72. Refunds

```text
refunds

id
refund_reference

order_id
payment_id nullable

customer_id

requested_amount
approved_amount
refunded_amount

reason
customer_notes
internal_notes

status

requested_at
approved_at
processed_at

requested_by
approved_by
```

---

# 73. Refund Status

```text
REQUESTED
UNDER_REVIEW
APPROVED
PARTIALLY_APPROVED
REJECTED
PROCESSING
COMPLETED
FAILED
CANCELLED
```

---

# 74. Refund Calculation Service

Backend should calculate:

```text
total_paid
-
non_refundable/committed obligations
-
completed services where contractually applicable
=
potential refundable amount
```

System provides recommendation.

Authorised staff approves.

---

# 75. Refund Approval Workflow

Use configurable approval policies.

Example:

```text
0 - 5,000
Finance Manager

5,001 - 50,000
Finance + Operations

50,001+
Senior Finance + Senior Management
```

---

# 76. Approval Engine

Rather than hard-code approvals only for refunds, create generic approval workflow capability later.

Can support:

Refund

Large payout

Seller verification

Price override

Manual payment adjustment

---

# 77. Shipments

```text
shipments

id
order_id
vehicle_id
supplier_id

shipping_line
vessel_name
voyage_number

transport_type

origin_port
destination_port

bill_of_lading_number

departure_date
estimated_arrival_date
actual_arrival_date

status

created_at
updated_at
```

---

# 78. Shipment Status

```text
PREPARING
AT_ORIGIN_PORT
LOADED
DEPARTED
IN_TRANSIT
ARRIVED
DISCHARGED
COMPLETED
```

---

# 79. Shipment Events

```text
shipment_events

id
shipment_id
event_type
description
event_time
location
source
created_at
```

Allows full timeline.

---

# 80. Customs Clearance

```text
customs_clearances

id
order_id
vehicle_id
clearing_agent_id

status

estimated_duty
actual_duty

port_charges

agent_cost
platform_clearing_fee

customs_reference

assessment_date
duty_paid_at
released_at

created_at
updated_at
```

---

# 81. Customs Status

```text
NOT_STARTED
DOCUMENTS_PENDING
PRE_ARRIVAL
DECLARATION_SUBMITTED
VALUATION
ASSESSMENT_READY
AWAITING_DUTY_PAYMENT
DUTY_PAID
EXAMINATION
RELEASED
COLLECTED
COMPLETED
```

---

# 82. Customs Integration Layer

Create interface:

```python
class CustomsProvider:
    async def estimate_duty(...)
    async def fetch_assessment(...)
    async def fetch_clearance_status(...)
```

MVP implementation:

```text
ManualCustomsProvider
```

Future:

```text
ICUMSProvider
```

if authorised integration becomes available.

This avoids rewriting clearing architecture later.

---

# 83. DVLA Registration

```text
dvla_registrations

id
order_id
vehicle_id
service_provider_id nullable

status

inspection_fee
official_registration_fee
plate_fee
service_provider_cost
platform_service_fee

registration_number nullable
plate_number nullable

inspection_at nullable
registered_at nullable

created_at
updated_at
```

---

# 84. DVLA Status

```text
NOT_STARTED
DOCUMENTS_PENDING
INSPECTION_BOOKED
INSPECTION_COMPLETED
SUBMITTED
REGISTERED
PLATE_READY
COMPLETED
```

---

# 85. Vehicle Delivery

```text
deliveries

id
order_id
provider_company_id

pickup_location
delivery_address

delivery_fee
provider_cost

status

scheduled_at
picked_up_at
delivered_at

receiver_name
proof_document_id nullable
```

---

# 86. Document Management

Central document table:

```text
documents

id
owner_type
owner_id

document_type

object_key
file_name
mime_type
file_size

verification_status

uploaded_by

created_at
verified_at
```

---

# 87. Document Types

Examples:

```text
PURCHASE_AGREEMENT
QUOTE
INVOICE
PAYMENT_RECEIPT
SUPPLIER_INVOICE
VEHICLE_TITLE
BILL_OF_LADING
CUSTOMS_ASSESSMENT
CUSTOMS_RECEIPT
DVLA_DOCUMENT
INSURANCE
INSPECTION_REPORT
IDENTITY_DOCUMENT
COMPANY_REGISTRATION
OTHER
```

---

# 88. Signed File Access

Documents should not be permanently public.

Use signed expiring URLs.

Example:

Customer requests:

```text
GET /orders/{id}/documents/{document_id}/download
```

Backend verifies permission.

Then generates temporary signed URL.

---

# 89. Reviews

```text
reviews

id
order_id
customer_id
dealer_id

overall_rating
vehicle_accuracy_rating
communication_rating
pricing_transparency_rating
delivery_rating

comment

status

created_at
updated_at
```

Unique constraint:

```text
(order_id, customer_id)
```

---

# 90. Review Eligibility

Backend verifies:

Order belongs to customer

Order has reached required completion status

Review not already submitted

---

# 91. Dealer Rating Calculation

Maintain cached aggregate:

```text
rating_average
review_count
```

But source of truth remains review rows.

Calculate asynchronously when review created/updated.

---

# 92. Seller Verification

```text
seller_verifications

id
dealer_id
verification_type

status

submitted_at
reviewed_at
expires_at

reviewed_by

notes
```

---

# 93. Verification Types

```text
PHONE
IDENTITY
BUSINESS
DEALER
ADDRESS
BANK_ACCOUNT
ENHANCED
```

---

# 94. Verification Documents

Use document relationships rather than storing file fields directly on dealer table.

---

# 95. Subscription Plans

```text
subscription_plans

id
name
code

monthly_price
annual_price

listing_limit
staff_limit
branch_limit

analytics_level

features_json

active
```

---

# 96. Dealer Subscriptions

```text
dealer_subscriptions

id
dealer_id
plan_id

billing_cycle

status

started_at
current_period_start
current_period_end

cancel_at_period_end

provider_subscription_reference nullable
```

---

# 97. Subscription Status

```text
TRIAL
ACTIVE
PAST_DUE
SUSPENDED
CANCELLED
EXPIRED
```

---

# 98. Feature Entitlements

Don't scatter logic:

```python
if plan == "premium":
```

Create entitlement service.

Example:

```text
can_create_listing
listing_limit
can_use_payment_plans
can_add_staff
staff_limit
can_view_advanced_analytics
```

---

# 99. Leads

```text
leads

id
customer_id nullable
dealer_id
listing_id nullable

source

name
phone
email

status

assigned_to nullable

created_at
updated_at
```

---

# 100. Lead Status

```text
NEW
CONTACTED
QUALIFIED
QUOTE_SENT
CONVERTED
LOST
```

---

# 101. Messaging

Recommended initial architecture:

```text
conversations
conversation_participants
messages
```

Message fields:

```text
id
conversation_id
sender_user_id
message_type
body
document_id nullable
read_at
created_at
```

---

# 102. Conversation Types

```text
BUYER_SELLER
CUSTOMER_SUPPORT
SUPPLIER_OPERATIONS
CLEARING_OPERATIONS
```

---

# 103. Notifications

```text
notifications

id
user_id
notification_type

title
body

data_json

read_at
created_at
```

---

# 104. Notification Channels

Create:

```text
notification_deliveries
```

Channels:

IN_APP

EMAIL

SMS

WHATSAPP

PUSH

---

# 105. Event-Driven Internal Architecture

Use domain events internally.

Examples:

```text
OrderCreated
PaymentReceived
MilestonePaid
VehicleAllocated
ShipmentDeparted
VehicleArrived
CustomsAssessmentReady
VehicleCleared
RegistrationCompleted
RefundApproved
```

Events can trigger:

notifications

ledger entries

analytics

background jobs

This avoids tightly coupling every module.

---

# 106. Transactional Outbox

For reliability, use an outbox pattern for critical domain events.

Tables:

```text
outbox_events
```

Within same PostgreSQL transaction:

Update order

+

insert outbox event

Background worker publishes/processes event.

This prevents situations where:

payment succeeds

database updates

but notification/event is lost because worker failed.

---

# 107. Search

MVP can use PostgreSQL search.

Use:

GIN indexes

full-text search

trigram indexes for fuzzy matching where useful.

Search:

Vehicle make

Model

Variant

Dealer

Keywords

---

# 108. Future Search

If catalogue becomes very large:

OpenSearch

Elasticsearch

Meilisearch

can later be introduced.

Don't add them unnecessarily in MVP.

---

# 109. API Versioning

Use:

```text
/api/v1/
```

Examples:

```text
/api/v1/auth
/api/v1/vehicles
/api/v1/listings
/api/v1/orders
```

Future breaking API:

```text
/api/v2/
```

---

# 110. API Standards

All endpoints should use consistent responses.

Success:

```json
{
  "data": {},
  "meta": {}
}
```

Errors:

```json
{
  "error": {
    "code": "PAYMENT_FAILED",
    "message": "Payment could not be completed.",
    "details": {}
  }
}
```

---

# 111. Pagination

Use cursor pagination for high-scale entities where practical.

Example:

```text
?limit=20&cursor=...
```

For simpler admin tables, offset pagination is acceptable initially.

---

# 112. Filtering

Example:

```text
GET /api/v1/listings?
make=byd
&body_type=suv
&fuel_type=hybrid
&min_price=150000
&max_price=400000
&location=china
```

---

# 113. Vehicle APIs

Examples:

```text
GET    /vehicles
POST   /vehicles
GET    /vehicles/{id}
PATCH  /vehicles/{id}
DELETE /vehicles/{id}
```

Listings:

```text
GET    /listings
POST   /listings
GET    /listings/{id}
PATCH  /listings/{id}
POST   /listings/{id}/publish
POST   /listings/{id}/pause
```

---

# 114. Quote APIs

```text
POST /quotes
GET /quotes/{id}
POST /quotes/{id}/send
POST /quotes/{id}/accept
POST /quotes/{id}/reject
POST /quotes/{id}/convert-to-order
```

---

# 115. Order APIs

```text
POST /orders
GET /orders
GET /orders/{id}
POST /orders/{id}/confirm
POST /orders/{id}/cancel
GET /orders/{id}/timeline
```

---

# 116. Pricing APIs

```text
POST /pricing/calculate
GET /pricing/rules
POST /pricing/rules
PATCH /pricing/rules/{id}
DELETE /pricing/rules/{id}
```

Customer estimate:

```text
POST /pricing/estimate-road-ready
```

---

# 117. Payment APIs

```text
POST /payments/initialize
GET  /payments/{id}
POST /payments/{id}/verify

POST /webhooks/paystack
POST /webhooks/hubtel
```

---

# 118. Refund APIs

```text
POST /refunds
GET /refunds/{id}
POST /refunds/{id}/approve
POST /refunds/{id}/reject
POST /refunds/{id}/process
```

---

# 119. Disbursement APIs

```text
POST /disbursements
GET /disbursements
GET /disbursements/{id}
POST /disbursements/{id}/approve
POST /disbursements/{id}/execute
```

---

# 120. Shipment APIs

```text
POST /shipments
GET /shipments/{id}
PATCH /shipments/{id}
POST /shipments/{id}/events
```

---

# 121. Clearing APIs

```text
POST /clearances
GET /clearances/{id}
PATCH /clearances/{id}
POST /clearances/{id}/assessment
POST /clearances/{id}/mark-duty-paid
POST /clearances/{id}/release
```

---

# 122. DVLA APIs

```text
POST /registrations
GET /registrations/{id}
PATCH /registrations/{id}
POST /registrations/{id}/complete-inspection
POST /registrations/{id}/complete
```

---

# 123. Dealer APIs

```text
POST /dealers/apply
GET /dealers/{id}
PATCH /dealers/{id}

POST /dealers/{id}/staff
GET /dealers/{id}/analytics
```

---

# 124. Seller Verification APIs

```text
POST /dealer-verifications
POST /dealer-verifications/{id}/documents

POST /admin/dealer-verifications/{id}/approve
POST /admin/dealer-verifications/{id}/reject
```

---

# 125. Upload API

Preferred architecture:

Frontend requests signed upload URL.

```text
POST /uploads/presign
```

Backend returns signed S3/R2 upload URL.

Frontend uploads directly.

Then:

```text
POST /documents
```

registers uploaded object.

This prevents large files passing unnecessarily through FastAPI.

---

# 126. Request-a-Car Backend

Tables:

```text
vehicle_requests
vehicle_request_offers
```

---

# 127. Vehicle Request

```text
vehicle_requests

id
customer_id

make_id nullable
model_id nullable

year_min
year_max

budget_min
budget_max

fuel_type
body_type
colour
condition

notes

status

created_at
```

---

# 128. Request Status

```text
SUBMITTED
SOURCING
OPTIONS_AVAILABLE
CUSTOMER_SELECTED
CONVERTED
CLOSED
CANCELLED
```

---

# 129. Supplier Offers

```text
vehicle_request_offers

id
request_id
supplier_id
vehicle_id nullable

supplier_price
tema_price
currency

estimated_delivery_date

status
notes
```

---

# 130. Admin Reports

Backend must provide endpoints for:

Sales

Revenue

GMV

Gross margin

Payments

Refunds

Outstanding balances

Supplier payables

Dealer payables

Clearing expenses

Vehicle sales by category

Dealer performance

---

# 131. Reporting Strategy

Do not run extremely heavy analytics queries against transactional tables every time.

Initially:

Optimized PostgreSQL queries

Materialized views where useful

Background generated aggregates

Later:

Dedicated analytics warehouse if necessary.

---

# 132. Audit Logs

```text
audit_logs

id
user_id
company_id nullable

action
entity_type
entity_id

old_data_json
new_data_json

ip_address
user_agent

created_at
```

Audit:

Pricing change

Refund approval

Payout

User role change

Dealer verification

Manual payment adjustment

Order override

---

# 133. Soft Deletes

For important business records:

Do not physically delete.

Use:

```text
deleted_at
```

or status.

Especially:

Orders

Payments

Refunds

Dealers

Documents metadata

Financial records

---

# 134. Financial Immutability

Once financial transaction is completed:

Don't edit amount directly.

Use reversal/adjustment entries.

Example:

Wrong GHS 50,000 allocation.

Don't change row to GHS 45,000 silently.

Create:

```text
-50,000 reversal

+45,000 correction
```

Maintain auditability.

---

# 135. Database Transactions

Use PostgreSQL transactions for multi-step critical operations.

Example:

Payment webhook:

1. Lock payment
2. Check already processed
3. Mark success
4. Update milestone
5. Update order payment total
6. Create ledger entry
7. Create allocations
8. Write outbox event
9. Commit

All succeed or none succeeds.

---

# 136. Row Locking

Use:

```sql
SELECT ... FOR UPDATE
```

where necessary for:

Payments

Refund approval

Payout processing

Vehicle reservation

Inventory allocation

This prevents race conditions.

---

# 137. Vehicle Reservation

When customer reserves vehicle:

Lock vehicle.

Confirm availability.

Create reservation.

Mark vehicle reserved.

Set reservation expiry.

If payment not completed before expiry:

Release vehicle.

---

# 138. Reservation Table

```text
vehicle_reservations

id
vehicle_id
customer_id
order_id nullable

status

reserved_at
expires_at
confirmed_at
released_at
```

---

# 139. Background Reservation Expiry

Scheduled worker checks expired reservations.

Do not rely on user returning to website.

---

# 140. Caching

Cache safe data:

Vehicle catalogue filters

Makes/models

Popular listings

Dealer profiles

Pricing reference data where appropriate

Never cache sensitive financial state incorrectly.

---

# 141. Rate Limiting

Apply to:

Login

OTP

Password reset

Quote creation

Search abuse

Messaging

Payment initialization

Public API

---

# 142. Input Validation

Pydantic validates:

Currency amounts

Phone numbers

Enums

Dates

VIN structure where practical

File metadata

Pagination

Seller price boundaries

Payment plan percentage totals

---

# 143. Money Representation

Never use floating-point values for currency.

PostgreSQL:

```text
NUMERIC(18,2)
```

or integer minor units.

Recommended:

NUMERIC for readability.

Python:

Decimal.

Never:

```python
float
```

for money.

---

# 144. Currency Support

Although Ghana customer prices are GHS, supplier costs may exist in:

CNY

USD

GHS

Create:

```text
currencies
exchange_rates
```

Store original supplier amount and currency.

Never destroy original values when converting.

---

# 145. Exchange Rate Table

```text
exchange_rates

id
base_currency
quote_currency
rate

source
effective_at

created_by nullable
```

Admin can set internal operational rate where required.

---

# 146. Exchange Rate Snapshot

Orders store rate used at quote/order time.

Future exchange-rate change must not modify existing agreed price.

---

# 147. Security

Required:

HTTPS only

Strong password hashing

Secure secrets

Encrypted sensitive recipient data

Database access through least privilege

MFA

RBAC

Webhook verification

Rate limiting

Audit logs

Input sanitisation

Secure file uploads

Dependency scanning

---

# 148. Sensitive Data

Encrypt at application/database level where appropriate:

Bank account details

MoMo recipient identifiers

Identity document numbers

International supplier payment instructions

Do not log sensitive values.

---

# 149. Secrets Management

Do not put:

DB passwords

Paystack secret key

Hubtel secret

AWS secret

JWT private key

inside source code.

Use:

Environment secrets locally

Managed secret service in production

---

# 150. CORS

Only approved frontend domains.

Example:

Production:

```text
https://agorazo.com
https://app.agorazo.com
```

Avoid:

```text
allow_origins=["*"]
```

in production.

---

# 151. API Documentation

FastAPI OpenAPI documentation is useful.

Environments:

Development:

Swagger available.

Production admin/private APIs:

protect or restrict documentation as appropriate.

---

# 152. Database Migration

Use Alembic.

Every schema modification requires migration.

Never manually alter production tables without tracked migration.

---

# 153. Migration Deployment

Deployment order:

Backup

Run migration

Deploy API

Verify

Monitor errors

For dangerous migration:

Use expand/contract approach.

---

# 154. Environment Structure

Required:

Local

Development

Staging

Production

Each must have separate:

Database

Redis

Object storage bucket/prefix

Payment credentials

Domains

Secrets

---

# 155. Local Development

Recommended:

Docker Compose.

Services:

```text
api
postgres
redis
worker
minio optional
```

One command should start backend dependencies.

---

# 156. Docker

Provide:

Dockerfile

docker-compose.yml

production image

multi-stage build

non-root runtime user

healthcheck

---

# 157. Deployment Architecture

A practical production setup:

```text
Cloudflare
   ↓
Load Balancer / Reverse Proxy
   ↓
FastAPI API instances
   ↓
PostgreSQL
   ↓
Redis
   ↓
Worker instances
   ↓
S3/R2
```

---

# 158. Health Endpoints

```text
/health/live
/health/ready
```

Readiness checks:

Database connectivity

Redis connectivity

Critical dependencies where appropriate

---

# 159. Observability

Implement:

Structured logs

Request IDs

Error monitoring

Performance monitoring

Metrics

Audit logging

Payment webhook monitoring

---

# 160. Request Correlation IDs

Each request receives:

```text
X-Request-ID
```

Propagate into logs and background jobs.

Important for debugging payment problems.

---

# 161. Metrics

Monitor:

API response latency

Error rate

Payment webhook failures

DB connection usage

Background queue length

Job failures

Redis health

PSP response time

Order creation rate

---

# 162. Alerts

Critical alerts:

Database unavailable

Payment webhook failure spike

High 5xx rate

Queue backlog

Repeated payout failure

Low disk/storage condition

Authentication attack/rate spike

---

# 163. Testing Strategy

Required:

Unit tests

Integration tests

API tests

Database tests

Payment webhook tests

Permission tests

Financial ledger tests

End-to-end transaction tests

---

# 164. Financial Tests

High-priority automated tests:

Duplicate payment webhook does not double credit.

Refund cannot exceed paid amount.

Allocations cannot exceed payment.

Payment milestone total equals order amount.

Payment plan percentages total 100%.

Seller cannot access another seller's orders.

Customer cannot download another customer's documents.

Vehicle cannot be sold twice.

---

# 165. Test Database

Use isolated PostgreSQL test database.

Do not substitute SQLite for backend tests because PostgreSQL behaviour differs.

---

# 166. Payment Sandbox

Integrate PSP sandbox/test environment.

Create automated tests around:

Successful payment

Failed payment

Pending payment

Duplicate webhook

Partial refund

Full refund

Transfer success

Transfer failure

---

# 167. Seed Data

Provide development seed script:

Agorazo company

Super Admin

Customer

China supplier

Clearing agent

Vehicle makes

Vehicle models

Sample cars

Payment plans

Pricing rules

---

# 168. API Client Generation

Frontend TypeScript client can be generated from FastAPI OpenAPI schema where useful.

This reduces mismatch between:

frontend types

backend types.

---

# 169. CI/CD

Pipeline should:

Lint

Format check

Run unit tests

Run integration tests

Security checks

Build Docker image

Apply staging deployment

Run smoke tests

Promote to production under controlled process

---

# 170. Coding Standards

Use:

Type hints everywhere

Async database patterns consistently where appropriate

Service/repository separation

Pydantic schemas

Domain enums

Structured errors

Dependency injection

No business rules inside route handlers

---

# 171. Route Handler Principle

Bad:

```python
@router.post("/orders")
async def create_order(...):
    # 300 lines of business logic
```

Good:

```python
@router.post("/orders")
async def create_order(...):
    return await order_service.create_order(...)
```

Business logic belongs in services.

---

# 172. Recommended Project Structure

```text
app/

├── main.py

├── core/
│   ├── config.py
│   ├── database.py
│   ├── security.py
│   ├── permissions.py
│   ├── exceptions.py
│   └── logging.py

├── modules/
│
│   ├── auth/
│   ├── users/
│   ├── companies/
│   ├── dealers/
│   ├── suppliers/
│   ├── vehicles/
│   ├── listings/
│   ├── pricing/
│   ├── quotes/
│   ├── orders/
│   ├── payments/
│   ├── ledger/
│   ├── refunds/
│   ├── disbursements/
│   ├── shipments/
│   ├── clearance/
│   ├── dvla/
│   ├── documents/
│   ├── reviews/
│   ├── subscriptions/
│   ├── messaging/
│   ├── notifications/
│   ├── disputes/
│   └── reporting/

├── integrations/
│   ├── payments/
│   ├── storage/
│   ├── messaging/
│   ├── customs/
│   └── banking/

├── workers/

├── migrations/

└── tests/
```

---

# 173. Per-Module Structure

Example:

```text
modules/orders/

models.py
schemas.py
repository.py
service.py
router.py
permissions.py
events.py
exceptions.py
```

---

# 174. Configuration

Use typed environment configuration.

Examples:

```text
APP_ENV
DATABASE_URL
REDIS_URL

JWT_SECRET
JWT_REFRESH_SECRET

PAYSTACK_SECRET_KEY
PAYSTACK_WEBHOOK_SECRET

HUBTEL_CLIENT_ID
HUBTEL_CLIENT_SECRET

S3_BUCKET
S3_ACCESS_KEY
S3_SECRET_KEY
```

---

# 175. MVP Backend Scope

Phase 1 backend must support:

Authentication

Users/customers

Agorazo seller company

Supplier

Vehicles

Vehicle listings

Pricing rules

Markup rules

Quotes

Request-a-Car

Orders

Service add-ons

Payment plans

Payments

Payment allocations

Basic ledger

Refund workflow

Shipments

Clearing workflow

DVLA workflow

Document vault

Notifications

Customer support

Admin reporting

Audit logs

---

# 176. MVP Exclusions

Do not build initially:

True escrow

P2P individual sellers

Complex lending

Crypto

Auctions

Advanced AI

Native banking core

Automatic ICUMS integration without authorised access

Microservices

Blockchain

---

# 177. Phase 2 Backend

Add:

Dealer onboarding

Dealer verification

Dealer subscriptions

Multi-dealer seller portal

Seller payout recipients

Payment splitting

Dealer CRM

Reviews

Disputes

Dealer analytics

Multiple branches

Staff roles

---

# 178. Phase 3 Backend

Add:

Insurance provider integration

Vehicle financing integrations

Inspection network

Delivery partner APIs

Advanced reporting

Automated marketplace risk scoring

---

# 179. Phase 4 Backend

Add:

Regulated escrow integration

AI services

Advanced fraud detection

Regional marketplace support

Multi-currency customer markets

Advanced search infrastructure

Potential service extraction where scale requires

---

# 180. Critical Backend Principle

The backend must treat four concepts separately:

### Payment

Money received from customer.

### Allocation

What that money is intended for.

### Disbursement

Money actually sent to another party.

### Revenue

What Agorazo has earned.

These must never be treated as the same thing.

---

# 181. Example Transaction

Customer pays:

GHS 320,000.

Backend records:

```text
Payments received:
320,000
```

Allocations:

```text
Supplier:
220,000

Government customs:
55,000

Clearing provider:
5,000

Agorazo vehicle margin:
25,000

Agorazo clearing fee:
5,000

DVLA:
4,000

Delivery:
2,000

Other:
4,000
```

As milestones occur:

eligible allocations become disbursements.

Agorazo revenue is recognised separately from third-party obligations.

---

# 182. Critical Marketplace Principle

Even though Phase 1 contains only Agorazo vehicles:

Every order must contain:

```text
seller_id
```

Every listing must contain:

```text
seller_id
```

Every payment allocation must understand:

```text
recipient
```

Every pricing rule must support:

```text
owner_company_id
```

This makes Phase 2 marketplace expansion an enablement exercise rather than a backend rewrite.

---

# 183. Critical Financial Principle

Do not implement a generic:

```text
wallet_balance
```

for dealers or customers in MVP.

Agorazo is not trying to become a digital wallet provider.

Instead maintain:

Payment records

Ledger balances

Outstanding payables

Settlement status

Refund liability

Money movement occurs through licensed PSPs and banking partners.

---

# 184. Critical Compliance Principle

The backend should preserve evidence.

Store:

Terms version

Quote snapshot

Price snapshot

Payment record

PSP transaction reference

Supplier invoice

Shipment documents

Clearing documents

Refund approvals

Audit history

This gives Agorazo a strong transaction record if a customer, dealer, bank, PSP or regulator asks what occurred.

---

# 185. Terms Acceptance Table

```text
terms_acceptances

id
user_id
order_id nullable

document_type
document_version

accepted_at
ip_address
user_agent
```

---

# 186. Privacy and Retention

Define retention policy by data category.

Financial/audit records should be retained according to applicable legal/accounting requirements.

Expired sensitive documents should not remain available indefinitely without purpose.

Support deletion/anonymisation workflows where legally appropriate.

---

# 187. Performance Targets

Typical read API:

Target sub-500ms where realistic.

Catalogue cached responses:

faster where possible.

Payment webhook:

acknowledge quickly after safe persistence.

Long jobs:

move to worker.

Never generate huge PDF/report synchronously inside a normal HTTP request.

---

# 188. Scalability

Initial architecture should comfortably support:

Thousands of users

Thousands of vehicles

Hundreds of dealers later

Large payment history

Many documents

without redesign.

Scale vertically first.

Then:

multiple API instances

worker scaling

read replicas

search service

analytics service

when justified.

---

# 189. Backup Strategy

PostgreSQL:

Automated backups

Point-in-time recovery where production infrastructure supports it

Regular restore testing

Object storage:

Versioning where appropriate

Lifecycle policies

---

# 190. Disaster Recovery

Document:

RPO

RTO

Database restoration steps

Secrets rotation

Payment reconciliation recovery

Object-storage restoration

PSP webhook replay strategy

---

# 191. Payment Reconciliation

Scheduled reconciliation job compares:

Agorazo payment records

against

PSP provider records.

Flag:

Missing transaction

Amount mismatch

Duplicate reference

Settlement mismatch

Refund mismatch

---

# 192. Reconciliation Table

```text
reconciliation_runs

id
provider
period_start
period_end
status

transactions_checked
matches
mismatches

created_at
completed_at
```

---

# 193. Manual Adjustment Controls

Any manual financial adjustment requires:

Reason

Supporting note

User

Timestamp

Approval where required

Audit entry

Never provide an unrestricted "Edit payment amount" field.

---

# 194. Admin Override

Critical operational overrides may exist, but should require:

Special permission

Reason

Audit log

Optional second approval

Examples:

Force release vehicle reservation

Correct shipment status

Override pricing

Manual payment confirmation

---

# 195. Future Integration Architecture

All external platforms should live behind adapters.

Examples:

```text
PaymentProvider
StorageProvider
MessagingProvider
CustomsProvider
FinanceProvider
InsuranceProvider
IdentityProvider
```

This prevents the business becoming tightly coupled to one vendor.

---

# 196. Backend Acceptance Criteria — Vehicle Sale

System must allow:

1. Admin/supplier creates vehicle.
2. Pricing engine calculates selling price.
3. Listing is published.
4. Customer requests quote/order.
5. Services are added.
6. Pricing snapshot created.
7. Payment plan generated.
8. Customer pays.
9. PSP webhook confirms payment.
10. Ledger and allocations update.
11. Supplier payable generated.
12. Vehicle allocated.
13. Shipment created.
14. Shipping milestones tracked.
15. Clearing workflow executed.
16. DVLA workflow executed where selected.
17. Delivery completed.
18. Order completed.
19. Customer can review transaction.

---

# 197. Backend Acceptance Criteria — Financial Integrity

System must guarantee:

No duplicate webhook credits.

No refund above available refundable amount.

No disbursement above eligible allocation.

No seller access to another seller's records.

No customer access to another customer's documents.

No floating-point money calculations.

No untracked financial edits.

Every payment has provider reference.

Every refund has audit trail.

Every payout has recipient and approval history.

---

# 198. Backend Acceptance Criteria — Marketplace

When Phase 2 is enabled:

A new dealer can be created without database redesign.

Dealer can create listings.

Orders retain seller ownership.

Pricing rules can be dealer-specific.

Payments can identify seller entitlement.

Reviews belong to dealers.

Subscriptions limit dealer features.

Dealer staff access only dealer data.

---

# 199. Recommended Implementation Sequence

## Sprint Group 1

Foundation:

FastAPI

PostgreSQL

Alembic

Auth

RBAC

Companies

Users

Infrastructure

Logging

Testing

---

## Sprint Group 2

Vehicle Commerce:

Vehicles

Suppliers

Listings

Media

Search

Pricing engine

Quotes

Request-a-Car

---

## Sprint Group 3

Orders:

Checkout

Services

Pricing snapshots

Orders

Payment plan templates

Milestones

---

## Sprint Group 4

Financial Core:

PSP abstraction

Paystack/Hubtel integration

Webhooks

Payments

Ledger

Allocations

Refunds

Reconciliation

---

## Sprint Group 5

Vehicle Operations:

Shipments

Shipment events

Clearing

DVLA

Delivery

Document vault

---

## Sprint Group 6

Platform Operations:

Notifications

Messaging

Support

Admin reports

Audit logs

---

## Sprint Group 7

Marketplace Enablement:

Dealers

Verification

Seller staff

Subscriptions

Seller CRM

Reviews

Disputes

Payment splitting/payouts

---

# 200. Final Technical Architecture

```text
                         AGORAZO PWA
                              │
                              │ HTTPS
                              ▼
                         FASTAPI API
                              │
       ┌──────────────────────┼─────────────────────┐
       │                      │                     │
       ▼                      ▼                     ▼
 PostgreSQL                Redis               Object Storage
System of Record       Cache / Queue             S3 / R2
       │                      │
       │                      ▼
       │                 Background Workers
       │                      │
       └──────────────┬───────┴───────────────┐
                      │                       │
                      ▼                       ▼
                Payment Providers         Notifications
               Paystack / Hubtel        Email/SMS/WhatsApp
                      │
                      ▼
                    Banks
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
       Supplier    Dealers      Service Providers
       China       Ghana       Clearing / DVLA
```

---

# 201. Final Backend Principle

Agorazo should not be built merely as:

**Cars + users + payments.**

It should be designed as a transaction platform containing:

**Marketplace**

+

**Pricing Engine**

+

**Order Engine**

+

**Payment Milestone Engine**

+

**Financial Ledger**

+

**Supplier Management**

+

**Vehicle Logistics**

+

**Clearing**

+

**Registration**

+

**Dealer Infrastructure**

+

**Trust and Audit Infrastructure**

The use of **FastAPI + PostgreSQL** is a strong fit for this architecture.

FastAPI should expose the APIs and enforce business rules.

PostgreSQL should remain the authoritative system of record.

Redis should support temporary state and background processing.

Object storage should handle media and documents.

Payment providers should handle regulated payment movement.

Agorazo should maintain the transaction logic, allocation records and audit trail around those payments.

Most importantly, the backend should be **multi-seller-ready from the first database migration**, even while Agorazo remains the only active seller during the MVP.

# AGORAZO

## BUY. SELL. DRIVE.
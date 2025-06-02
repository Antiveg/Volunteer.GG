import User from '@/db/models/user'
import Event from '@/db/models/event'
import Achievement from '@/db/models/achievement'
import CategorizedEvent from '@/db/models/categorizedevent'
import Chat from '@/db/models/chat'
import EventCategory from '@/db/models/eventcategory'
import EventImage from '@/db/models/eventimage'
import EventParticipant from '@/db/models/eventparticipant'
import Item from '@/db/models/item'
import Organization from '@/db/models/organization'
import OrganizationImage from '@/db/models/organizationimage'
import OrganizationMember from '@/db/models/organizationmember'
import OrganizationReview from '@/db/models/organizationreview'
import UserAchievement from '@/db/models/userachievement'
import UserCertificate from '@/db/models/usercertificate'
import UserPurchase from '@/db/models/userpurchase'
import UserRelation from '@/db/models/userrelation'

OrganizationMember.belongsTo(Organization, { foreignKey: 'organization_id' })
Organization.hasMany(OrganizationMember, { foreignKey: 'organization_id' })

User.hasMany(EventParticipant, { foreignKey: 'user_id' })
EventParticipant.belongsTo(User, { foreignKey: 'user_id' })

OrganizationMember.belongsTo(User, { foreignKey: 'user_id' })

CategorizedEvent.belongsTo(EventCategory, { foreignKey: 'category_id' })
EventCategory.hasMany(CategorizedEvent, { foreignKey: 'category_id' })

Organization.hasMany(OrganizationImage, { foreignKey: 'organization_id' })

EventParticipant.belongsTo(OrganizationMember, { foreignKey: 'user_id' })

Event.hasMany(EventImage, { foreignKey: 'event_id' });

Event.hasMany(CategorizedEvent, { foreignKey: 'event_id' })

Event.hasMany(EventParticipant, { foreignKey: 'event_id' })

export {
  User,
  Event,
  Achievement,
  CategorizedEvent,
  Chat,
  EventCategory,
  EventImage,
  EventParticipant,
  Item,
  Organization,
  OrganizationImage,
  OrganizationMember,
  OrganizationReview,
  UserAchievement,
  UserCertificate,
  UserPurchase,
  UserRelation
}

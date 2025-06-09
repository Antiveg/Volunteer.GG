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
import OrganizationFollower from '@/db/models/organizationfollower'
import UserHistory from '@/db/models/userhistory'
import UserNotification from '@/db/models/usernotification'

// User
User.hasMany(Organization, { foreignKey: 'creator_id' });
User.hasMany(EventParticipant, { foreignKey: 'user_id' });
User.hasMany(OrganizationMember, { foreignKey: 'user_id' });
User.hasMany(OrganizationReview, { foreignKey: 'user_id' });
User.hasMany(OrganizationFollower, { foreignKey: 'user_id' });
User.hasMany(UserAchievement, { foreignKey: 'user_id' });
User.hasMany(UserNotification, { as: 'sent_notifications', foreignKey: 'sender_id' });
User.hasMany(UserNotification, { as: 'received_notifications', foreignKey: 'receiver_id' });
User.hasMany(UserCertificate, { foreignKey: 'user_id' });
User.hasMany(UserRelation, { as: 'friends', foreignKey: 'user_id' });
User.hasMany(UserPurchase, { foreignKey: 'user_id' });
User.hasMany(UserHistory, { foreignKey: 'user_id' });
User.hasMany(Chat, { as: 'sent_chats', foreignKey: 'sender_id' });
User.hasMany(Chat, { as: 'received_chats', foreignKey: 'receiver_id' });
User.hasMany(Event, { foreignKey: 'creator_id' });

// Organization
Organization.belongsTo(User, { foreignKey: 'creator_id' });
Organization.hasMany(OrganizationMember, { foreignKey: 'organization_id' });
Organization.hasMany(OrganizationReview, { foreignKey: 'organization_id' });
Organization.hasMany(OrganizationImage, { foreignKey: 'organization_id' });
Organization.hasMany(OrganizationFollower, { foreignKey: 'organization_id' });
Organization.hasMany(Event, { foreignKey: 'organization_id' })

// OrganizationMembers
OrganizationMember.belongsTo(User, { foreignKey: 'user_id' });
OrganizationMember.belongsTo(Organization, { foreignKey: 'organization_id' });

// OrganizationReviews
OrganizationReview.belongsTo(User, { foreignKey: 'user_id' });
OrganizationReview.belongsTo(Organization, { foreignKey: 'organization_id' });

// OrganizationImages
OrganizationImage.belongsTo(Organization, { foreignKey: 'organization_id' });

// OrganizationFollowers
OrganizationFollower.belongsTo(User, { foreignKey: 'user_id' });
OrganizationFollower.belongsTo(Organization, { foreignKey: 'organization_id' });

// UserAchievements
UserAchievement.belongsTo(User, { foreignKey: 'user_id' });
UserAchievement.belongsTo(Achievement, { foreignKey: 'achievement_id' });

// Achievements
Achievement.hasMany(UserAchievement, { foreignKey: 'achievement_id' });

// UserNotifications
UserNotification.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });
UserNotification.belongsTo(User, { as: 'receiver', foreignKey: 'receiver_id' });

// UserCertificates
UserCertificate.belongsTo(User, { foreignKey: 'user_id' });

// UserRelations (friendship)
UserRelation.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
UserRelation.belongsTo(User, { as: 'friend', foreignKey: 'friend_id' });

// Item
Item.hasMany(UserPurchase, { foreignKey: 'item_id' });

// UserPurchases
UserPurchase.belongsTo(User, { foreignKey: 'user_id' });
UserPurchase.belongsTo(Item, { foreignKey: 'item_id' });

// UserHistory
UserHistory.belongsTo(User, { foreignKey: 'user_id' });
UserHistory.belongsTo(UserPurchase, { foreignKey: 'purchase_id' });
UserHistory.belongsTo(Event, { foreignKey: 'user_id' })

// Chat
Chat.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });
Chat.belongsTo(User, { as: 'receiver', foreignKey: 'receiver_id' });

// EventParticipants
EventParticipant.belongsTo(User, { foreignKey: 'user_id' });
EventParticipant.belongsTo(Event, { foreignKey: 'event_id' });

// Event
Event.hasMany(EventParticipant, { foreignKey: 'event_id' });
Event.belongsTo(User, { foreignKey: 'creator_id' });
Event.hasMany(EventImage, { foreignKey: 'event_id' });
Event.hasMany(CategorizedEvent, { foreignKey: 'event_id' });
Event.belongsTo(Organization, { foreignKey: 'organization_id' })
Event.hasMany(UserHistory, { foreignKey: 'user_id' })

// EventImages
EventImage.belongsTo(Event, { foreignKey: 'event_id' });

// CategorizedEvent
CategorizedEvent.belongsTo(Event, { foreignKey: 'event_id' });
CategorizedEvent.belongsTo(EventCategory, { foreignKey: 'category_id' });

// EventCategories
EventCategory.hasMany(CategorizedEvent, { foreignKey: 'category_id' });

// UserPurchase
UserPurchase.hasMany(UserHistory, { foreignKey: 'purchase_id' })

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
  UserRelation,
  OrganizationFollower,
  UserHistory,
  UserNotification,
}

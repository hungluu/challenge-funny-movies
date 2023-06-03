FactoryBot.define do
  factory :medium do
    name { Faker::Movie.title }
    description { Faker::Quote.yoda }
    thumbnail { Faker::Internet.url }
    url { Faker::Internet.url + Time.now.to_i.to_s }
    association :user, factory: :user

    created_at { Time.zone.now }
    updated_at { Time.zone.now }
  end
end

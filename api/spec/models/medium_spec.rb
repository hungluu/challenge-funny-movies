require 'rails_helper'

RSpec.describe Medium, type: :model do
  it "should validate for uniqueness in 10 minutes" do
    duplicatedUrl = 'https://duplicated-test.local'
    query = mock_orm(Medium, [
      build(:medium, url: duplicatedUrl, name: 'Test')
    ])

    duplicated_medium = build(:medium, url: duplicatedUrl, name: 'Test-Duplicate')

    duplicated_medium.valid?
    expect(duplicated_medium.errors[:url]).to include(/already shared/)

    query.clean
  end
end

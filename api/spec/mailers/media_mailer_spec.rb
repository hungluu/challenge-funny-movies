require "rails_helper"

RSpec.describe MediaMailer, type: :mailer do
  let(:user) { build(:user, id: 1) }
  let(:mail) { described_class.with(user: user).test }

  it 'renders the subject' do
    expect(mail.subject).to eq('Test')
  end

  it 'renders the receiver email' do
    expect(mail.to).to eq([user.email])
  end

  it 'says hello' do
    expect(mail.body.encoded).to include('Hi there')
  end
end

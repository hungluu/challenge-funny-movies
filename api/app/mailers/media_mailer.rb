class MediaMailer < ApplicationMailer
  def test()
    @user = params[:user]

    mail(:to => @user.email, :subject => 'Test')
  end
end

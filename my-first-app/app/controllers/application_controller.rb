class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token 
  def nothing
      render text: '', content_type: 'text/plain'
  end
 
  
end

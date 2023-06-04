require 'pagy/extras/metadata'
require "pagy_cursor/pagy/extras/cursor"

class MediaController < ApplicationController
  include Pagy::Backend

  before_action :authenticate_user!, only: :create

  # GET /media
  def index
    if params[:after].present?
      after = params[:after]
      @pagy, @media = pagy_cursor(Medium.all, after: after, order: { created_at: :desc })
      @pagy.vars[:metadata] = [
        :page_url,
        :next_url,
        :items
      ]

      @pagination = pagy_metadata(@pagy)

      # pagy_metadata is buggy with cursor urls
      # these custom logics should be put into services
      # for quick demo it could be here
      last_id = @media.last&.id
      @pagination[:page_url] = @pagination[:page_url].gsub(/(\d*&|\?)page=\d*/, after)
      if last_id && @media.size >= @pagination[:items]
        @pagination[:next_url] = @pagination[:next_url].gsub(/(\d*&|\?)page=\d*/, last_id.to_s)
      else
        @pagination[:next_url] = ""
      end
    else
      @pagy, @media = pagy(Medium.order(created_at: :desc).all)
      @pagy.vars[:metadata] = [
        :page_url,
        :next_url,
        :items,
        :count,
        :pages,
        :next
      ]

      @pagination = pagy_metadata(@pagy)
    end

    render json: { media: @media, pagination: @pagination }
  end

  # POST /media
  def create
    params = medium_params

    if !valid_url?(params[:url])
      render json: { errors: ['invalid video url'] }, status: :unprocessable_entity
      return
    end

    video = VideoInfo.get(params[:url])

    if !video.available?
      render json: { errors: ['can not get video info'] }, status: :unprocessable_entity
      return
    end

    @medium = Medium.new(
      name: video.title,
      description: video.description,
      thumbnail: video.thumbnail_medium,
      url: params[:url],
      user: current_user
    )

    if @medium.save
      render json: @medium, status: :created
    else
      render json: { errors: @medium.errors }, status: :unprocessable_entity
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def medium_params
      params.require(:medium).permit(:url)
    end

    # Should move logics into services
    def valid_url?(url)
      youtube_url_pattern = %r{(https?://)?(www\.)?(youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/|youtube\.com/v/|youtube\.com/playlist\?list=)([A-Za-z0-9_-]*)(&\S+)?}
      youtube_url_pattern.match?(url)
    end
end

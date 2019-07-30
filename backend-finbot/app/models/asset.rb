class Asset < ApplicationRecord
    require 'HTTParty'

    belongs_to :asset_type
    belongs_to :user

    has_many :actions

    def update_close_price
        if self.ticker_symbol == "USD"
            self.update(close_price: 1.0)
        else
        iex_api_key = Figaro.env.iex_api_key
        iex_url = 'https://cloud.iexapis.com/stable/data-points'
        price = HTTParty.get("#{iex_url}/#{self.ticker_symbol}/QUOTE-LATESTPRICE?&token=#{iex_api_key}").response.body.to_f
            if price.is_a?(Float)
                self.update(close_price: price)
            else
            end
        end
    end

end

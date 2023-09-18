require "application_system_test_case"

class BloggersTest < ApplicationSystemTestCase
  setup do
    @blogger = bloggers(:one)
  end

  test "visiting the index" do
    visit bloggers_url
    assert_selector "h1", text: "Bloggers"
  end

  test "should create blogger" do
    visit bloggers_url
    click_on "New blogger"

    fill_in "Name", with: @blogger.name
    click_on "Create Blogger"

    assert_text "Blogger was successfully created"
    click_on "Back"
  end

  test "should update Blogger" do
    visit blogger_url(@blogger)
    click_on "Edit this blogger", match: :first

    fill_in "Name", with: @blogger.name
    click_on "Update Blogger"

    assert_text "Blogger was successfully updated"
    click_on "Back"
  end

  test "should destroy Blogger" do
    visit blogger_url(@blogger)
    click_on "Destroy this blogger", match: :first

    assert_text "Blogger was successfully destroyed"
  end
end

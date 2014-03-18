package arch.controllers

import arch.views
import org.apache.commons.io.IOUtils
import play.api.mvc._
import play.api.Play.{current => application}

object BuildingsController extends Controller {

  def building(key: String) = Action {
    application.resourceAsStream(s"arch/shapes/data/$key.json") map { stream =>
      val buildingJson = IOUtils.toString(stream)
      Ok(views.html.building(buildingJson))
    } getOrElse {
      NotFound("Not found")
    }
  }

}

import com.benmccann.playplovr.{PlayPlovrPlugin => Plovr}
import sbt._
import sbt.Keys._

object ApplicationBuild extends Build {

  val appName         = "architecture"
  val appVersion      = "0.0-SNAPSHOT"

  val appDependencies = Seq(
    "commons-io" % "commons-io" % "2.4"
  )

  val main = play.Project(appName, appVersion, appDependencies).settings(
    Plovr.defaultPlovrSettings ++ Seq(
      Plovr.plovrTargets <<= baseDirectory(base => Seq(
        base / "project" / "plovr" /  "build.json" -> "public/javascripts/build.js"
      ))
    ):_*
  )
}

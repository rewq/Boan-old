#include "mainwindow.h"
#include "ui_mainwindow.h"

#include "dialog_about.h"

#include <QFileSystemModel>
#include <QTreeView>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow) {
    ui->setupUi(this);

    QFileSystemModel *model = new QFileSystemModel;
    model->setRootPath(QDir::currentPath());
    QTreeView *tree = ui->treeView;
    tree->setModel(model);


}

MainWindow::~MainWindow() {
    delete ui;
}

void MainWindow::on_actionAbout_triggered() {
    Dialog_about mDialog;
    mDialog.setModal(true);
    mDialog.exec();
}
